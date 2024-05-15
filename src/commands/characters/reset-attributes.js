const { SlashCommandBuilder } = require("discord.js");

const Character = require("../../services/characters/character.model.js");
const User = require("../../services/users/user.model.js");

module.exports = {
  cooldown: 5,
  category: "characters",
  data: new SlashCommandBuilder()
    .setName("reset-attributes")
    .setDescription("Resets a character's attributes to base values and recalculates status points"),
    // .addStringOption(option =>
    //     option.setName("character-id")
    //       .setDescription("Id of the character whose stats are to be reset.")
    //       .setRequired(true)
    //   ),
  async execute(interaction) {
    // const characterId = interaction.options.getString("character-id");
    const memberId = interaction.member.user.id;

    const user = await User.findOne({ userId: memberId })

    if (!user) {
      return await interaction.reply("You are not registered. Use the \`/register\` command to register.");
    }

    const character = await Character.findOne({ Id: user.selectedCharacterId });

    if (!character) {
      return await interaction.reply(`Please select a character first \`/select-character [character-id]\`. \nTo check all your characters use /\`my-characters\` command. \nIf you do not have a character /\`create-character\` [name] [class] [race].`);
    }

    // if (!character) {
    //   return interaction.reply("Character not found");
    // }

    const baseValue = 10;
    const attributeNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
    let pointsToReset = 0;

    attributeNames.forEach(stat => {
      pointsToReset += character[stat] - baseValue;
      character[stat] = baseValue;
    });

    character.AttributePoints += pointsToReset;

    await character.save();

    return interaction.reply(`All attributes reset to **${baseValue}**. Reclaimed  \`${pointsToReset}\` attribute points.`);
  },
};
