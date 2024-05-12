const { SlashCommandBuilder } = require("discord.js");
const Character = require("../../services/characters/character.model.js");

module.exports = {
  cooldown: 5,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("create-character")
    .setDescription("Creates a new character")
    .addStringOption(option =>
      option.setName("name")
        .setDescription("The name of the character")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("class")
        .setDescription("The class of the character")
        .addChoices(
          { name: "Knight", value: "Knight" },
          { name: "Mage", value: "Mage" },
          { name: "Rogue", value: "Rogue" },
          { name: "Cleric", value: "Cleric" },
          { name: "Barbarian", value: "Barbarian" },
        )
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("race")
        .setDescription("The race of the character")
        .addChoices(
          { name: "Human", value: "Human" },
          { name: "Elf", value: "Elf" },
          { name: "Dwarf", value: "Dwarf" },
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const characterName = interaction.options.getString("name");
    const characterClass = interaction.options.getString("class");
    const characterRace = interaction.options.getString("race");

    try {
      const latestCharacterId = await Character.findOne().sort({ Id: -1 }).limit(1);
      const nextCharacterId = latestCharacterId ? latestCharacterId.Id + 1 : 1;

      const characterData = {
        Id: nextCharacterId,
        Name: characterName,
        Class: characterClass,
        Race: characterRace,
        Level: 1,
        XP: 0,
        HP: 10,
        MP: 5,
        STR: 10,
        DEX: 10,
        CON: 10,
        INT: 10,
        WIS: 10,
        CHA: 10,
      };

      const newCharacter = await Character.create(characterData);
      await interaction.reply(`Created character ${newCharacter.Name} with id ${newCharacter.Id}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Error creating character.");
    }
  },
};

