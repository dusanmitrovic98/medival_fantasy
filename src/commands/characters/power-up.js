const { SlashCommandBuilder } = require("discord.js");

const Character = require("../../services/characters/character.model.js");

module.exports = {
  cooldown: 5,
  category: "characters",
  data: new SlashCommandBuilder()
    .setName("power-up")
    .setDescription("Increases a character's status point")
    .addStringOption(option)
    .addStringOption(option =>
      option
        .setName("class")
        .setDescription("The class of the character")
        .addChoices(
          { name: "STR", value: "STR" },
          { name: "DEX", value: "DEX" },
          { name: "CON", value: "CON" },
          { name: "INT", value: "INT" },
          { name: "WIS", value: "WIS" },
          { name: "CHA", value: "CHA" },
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const characterId = interaction.options.getInteger("characterId");
    const statusName = interaction.options.getString("statusName");
    const amount = interaction.options.getInteger("amount");

    const character = await Character.findById(characterId);

    if (!character) {
      return interaction.reply("Character not found");
    }

    if (character.StatusPoints < amount) {
      return interaction.reply("Insufficient Status Points");
    }

    character.StatusPoints -= amount;
    character[statusName] += amount;

    await character.save();

    return interaction.reply(`Increased ${statusName} by ${amount}`);
  },
};
