const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const User = require('../../services/users/user.model.js');
const Character = require('../../services/characters/character.model.js');

module.exports = {
  cooldown: 5,
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('unsubscribe')
    .setDescription('Delete user profile'),
  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const existingUser = await User.findOne({ userId: userId });

      if (!existingUser) {
        await interaction.reply('You are not registered. Use the `/register` command to register.');
        return;
      }

      // Create a confirmation button
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary)
      );

      await interaction.reply({
        content: 'Are you sure you want to delete your profile and all associated characters?',
        components: [row]
      });

      const filter = i => i.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async i => {
        if (i.customId === 'confirm') {
          // Remove all characters associated with the user
          const characterIds = existingUser.characters;
          await Character.deleteMany({ Id: { $in: characterIds } });

          // Delete the user profile
          await User.findOneAndDelete({ userId: userId });

          await i.update({ content: 'Your profile and all associated characters have been deleted.', components: [] });
        } else if (i.customId === 'cancel') {
          await i.update({ content: 'Profile deletion cancelled.', components: [] });
        }
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          interaction.editReply({ content: 'Profile deletion timed out.', components: [] });
        }
      });

    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error deleting your profile. Please try again later.');
    }
  },
};
