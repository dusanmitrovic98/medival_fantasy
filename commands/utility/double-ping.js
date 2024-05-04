const wait = require('node:timers/promises').setTimeout;
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('double-ping')
		.setDescription('Replies with Pong! Following with another Pong response after 2s.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
        await wait(2_000);
		await interaction.editReply('Pong again!');
	},
};