const wait = require('node:timers/promises').setTimeout;
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('follow-up-ping')
		.setDescription('Replies with Pong! Following up with another Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		await interaction.followUp({ content: 'Pong again!', ephemeral: true });
	},
};