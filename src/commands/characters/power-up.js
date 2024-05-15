const { SlashCommandBuilder } = require("discord.js");

const Character = require("../../services/characters/character.model.js");
const User = require("../../services/users/user.model.js");

module.exports = {
  cooldown: 5,
  category: "characters",
  data: new SlashCommandBuilder()
    .setName("power-up")
    .setDescription("Increases a character's status point")
    .addStringOption(option =>
        option.setName("character-id")
          .setDescription("Id of the character which stats are to be updated.")
          .setRequired(true)
      )
    .addStringOption(option =>
      option.setName("stat-name")
        .setDescription("Select status that you want to upgrade.")
        .addChoices(
          { name: "STR", value: "STR" },
          { name: "DEX", value: "DEX" },
          { name: "CON", value: "CON" },
          { name: "INT", value: "INT" },
          { name: "WIS", value: "WIS" },
          { name: "CHA", value: "CHA" },
        )
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("amount")
        .setDescription("Amount of points to use for the upgrade.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const characterId = interaction.options.getString("character-id");
    const statusName = interaction.options.getString("stat-name");
    const amount = interaction.options.getInteger("amount");
    const memberId = interaction.member.user.id;

    const user = await User.findOne({ userId: memberId })

    if (!user) {
      return await interaction.reply("You are not registered. Use the \`/register\` command to register.");
    }

    const character = await Character.findOne({Id: characterId});

    if (!character) {
      return interaction.reply("Character not found");
    }

    if (character.AttributePoints < amount) {
      return interaction.reply("Insufficient Status Points");
    }

    character.AttributePoints -= amount;
    character[statusName] += amount;

    await character.save();

    return interaction.reply(`Increased ${statusName} by ${amount}`);
  },
};
