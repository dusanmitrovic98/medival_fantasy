const { SlashCommandBuilder } = require("discord.js");
const Character = require("../../services/characters/character.model.js");

module.exports = {
  cooldown: 5,
  category: "characters",
  data: new SlashCommandBuilder()
    .setName("remove-character")
    .setDescription("Removes an existing character")
    .addStringOption(option =>
      option.setName("id")
        .setDescription("The ID of the character to be removed")
        .setRequired(true)
    ),
  async execute(interaction) {
    const characterId = interaction.options.getString("id");
    const memberId = interaction.member.user.id;

    try {
      const character = await Character.findOne({ Id: characterId });

      if (!character) {
        await interaction.reply(`Character with ID ${characterId} not found.`);
        return;
      }

      if (String(memberId) !== String(character.UserId)) {
        await interaction.reply(`You are not authorized to remove this character.`);
        return;
      }

      const deletedCharacter = await Character.findOneAndDelete({ Id: characterId });

      if (deletedCharacter) {
        await interaction.reply(`Character ${deletedCharacter.Name} with id ${deletedCharacter.Id} has been removed.`);
      } else {
        await interaction.reply(`Failed to remove character with ID ${characterId}.`);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply("Error removing character.");
    }
  },
};