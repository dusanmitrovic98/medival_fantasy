const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('d20')
		.setDescription('Rolls a d20 and responds with the result.'),
	async execute(interaction) {
		const roll = Math.floor(Math.random() * 20) + 1;
		await interaction.reply(`The result is ${roll}`);
	},
};

