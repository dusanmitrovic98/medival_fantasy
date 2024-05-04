const wait = require('node:timers/promises').setTimeout;
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('disappearing-ping')
		.setDescription('Replies with Pong! This response will be destroyed in 2s!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
        // const message = await interaction.fetchReply();
        // console.log(message);
        await wait(2_000);
        await interaction.deleteReply();
	},
};