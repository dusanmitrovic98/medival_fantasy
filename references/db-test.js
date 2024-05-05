const { SlashCommandBuilder } = require('discord.js');
const User = require('../services/users/user.model.js');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('db-test')
		.setDescription('Stores the user to the database. Input name required.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input', true);
		const user = new User({name: input ? input : null});
		await user.save();
		const result = await User.find();
		console.log(result);
		await interaction.reply({content: `Saved to the database: ${result[result.length - 1]}`});
	},
};