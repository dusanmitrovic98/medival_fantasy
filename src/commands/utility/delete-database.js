const { SlashCommandBuilder } = require('discord.js');

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
		if (member.id === adminId) {
			await deleteDatabase();
			await interaction.reply('Database deleted.');
		} else {
			await interaction.reply('You are not allowed to delete the database.');
		}
	},
};

