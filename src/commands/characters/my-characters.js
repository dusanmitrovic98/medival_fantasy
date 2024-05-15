const { SlashCommandBuilder } = require("discord.js");

const User = require("../../services/users/user.model.js");
const Character = require("../../services/characters/character.model.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("my-characters")
    .setDescription("Displays all characters of the user"),
  async execute(interaction) {
    const memberId = interaction.member.user.id;

    try {
      const user = await User.findOne({ userId: memberId });

    if (!user) {
      return await interaction.reply("You are not registered. Use the \`/register\` command to register.");
    }

      if (!user || !user.characters || user.characters.length === 0) {
        return await interaction.reply("You have no characters.");
      }

      const characters = await Character.find({ Id: { $in: user.characters } });

      if (!characters || characters.length === 0) {
        return await interaction.reply("You have no characters.");
      }

      const characterList = characters.map((char, index) => {
        return `${index + 1}. **\` ${char.Name} \`** (ID: \` ${char.Id} \`, Class: \` ${char.Class} \`, Race: \` ${char.Race} \`)`;
      }).join("\n");

      await interaction.reply(`Your characters:\n${characterList}`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Error retrieving your characters.");
    }
  },
};
