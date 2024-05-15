const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { adminId } = require('../../../config.json');
const { deleteDatabase } = require('../../../db.js');

module.exports = {
  cooldown: 5,
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('delete-database')
    .setDescription('Delete the database.'),
  async execute(interaction) {
    const member = interaction.member;

    if (member.id !== adminId) {
      await interaction.reply('You are not allowed to delete the database.');
      return;
    }

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
      content: 'Are you sure you want to delete the database?',
      components: [row]
    });

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'confirm') {
        await deleteDatabase();
        await i.update({ content: 'Database deleted.', components: [] });
      } else if (i.customId === 'cancel') {
        await i.update({ content: 'Database deletion cancelled.', components: [] });
      }
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        interaction.editReply({ content: 'Database deletion timed out.', components: [] });
      }
    });
  },
};
