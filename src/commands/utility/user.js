const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply(`Username: \`${interaction.user.username}\`, who joined on \`${interaction.member.joinedAt}\`.`);
	},
};