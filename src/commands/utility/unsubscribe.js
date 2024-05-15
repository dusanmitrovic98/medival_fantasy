const { SlashCommandBuilder } = require('discord.js');

const User = require('../../services/users/user.model.js');

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
        await interaction.reply('You are not registered. Use the \`/register\` command to register.');
        return;
      }

      await User.findOneAndDelete({ userId: userId });
      await interaction.reply('Your profile has been deleted.');
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error deleting your profile. Please try again later.');
    }
  },
};
