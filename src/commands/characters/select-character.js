const { SlashCommandBuilder } = require("discord.js");

const Character = require("../../services/characters/character.model.js");
const User = require("../../services/users/user.model.js");

module.exports = {
  cooldown: 5,
  category: "characters",
  data: new SlashCommandBuilder()
    .setName("select-character")
    .setDescription("Selects a character by ID")
    .addStringOption(option =>
      option.setName("character_id")
        .setDescription("ID of the character to select")
        .setRequired(true)
    ),
  async execute(interaction) {
    const memberId = interaction.member.user.id;
    const characterId = interaction.options.getString("character_id");

    try {
      const memberId = interaction.member.user.id;

      const user = await User.findOne({ userId: memberId })

      if (!user) {
        return await interaction.reply("You are not registered. Use the \`/register\` command to register.");
      }

      const character = await Character.findOne({ Id: characterId });

      if (!character) {
        return await interaction.reply("Character not found.");
      }

      user.selectedCharacterId = characterId;
      await user.save();

      await interaction.reply(`Character \` ${character.Name} \` (ID: \` ${character.Id} \`) selected.`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Error selecting character.");
    }
  },
};
