const { SlashCommandBuilder } = require('discord.js');
const User = require('../../services/users/user.model.js');

module.exports = {
  cooldown: 5,
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register a new user'),
  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const existingUser = await User.findOne({ userId: userId });

      if (existingUser) {
        await interaction.reply('You are already registered.');
        return;
      }

      const user = new User({
        userId: userId,
        username: interaction.user.username,
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        characterId: null,
        characterName: 'None',
        characterClass: 'None',
        characterRace: 'None',
        characterLevel: 1,
        characterXP: 0,
        characterHP: 10,
        characterMP: 5,
        characterSTR: 10,
        characterDEX: 10,
        characterCON: 10,
        characterINT: 10,
        characterWIS: 10,
        characterCHA: 10,
      });

      await user.save();
      await interaction.reply('You have successfully registered!');
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error registering you. Please try again later.');
    }
  },
};