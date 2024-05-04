const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true))
    // .addChannelOption(option =>
    //     option.setName('channel')
    //         .setDescription('The channel to echo into'))
    // .addBooleanOption(option =>
	// 	option.setName('ephemeral')
	// 		.setDescription('Whether or not the echo should be ephemeral'));

module.exports = {
    cooldown: 5,
    category: 'utility',
    data: data,
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(`You said: ${input}`);
    },
};
