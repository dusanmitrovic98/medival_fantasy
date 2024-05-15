const { SlashCommandBuilder } = require("discord.js");
const User = require("../../services/users/user.model.js");
const Character = require("../../services/characters/character.model.js");

module.exports = {
  cooldown: 5,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("View your profile"),
  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const user = await findUserById(userId);

      if (!user) {
        return await interaction.reply("You are not registered. Use the \`/register\` command to register.");
      }

      const character = await findSelectedCharacter(user.selectedCharacterId);

      if (!character) {
        return await interaction.reply(`Please select a character first \`/select-character [character-id]\`. \nTo check all your characters use /\`my-characters\` command. \nIf you do not have a character /\`create-character\` [name] [class] [race].`);
      }

      const embed = buildProfileEmbed(interaction.user.username, character);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply("There was an error fetching your profile. Please try again later.");
    }
  },
};

async function findUserById(userId) {
  return await User.findOne({ userId: userId });
}

async function findSelectedCharacter(characterId) {
  if (!characterId) return null;
  return await Character.findOne({ Id: characterId });
}

function buildProfileEmbed(username, character) {
  return {
    title: `${username}'s Profile 🛡️`,
    description: "Here is your selected character profile:",
    color: 0x0099ff,
    fields: [
      { name: "", value: `ID:  **\` ${character.Id} \`**` },
      { name: "", value: `Name:  **\` ${character.Name} \`**` },
      { name: "", value: `Class:  \` ${character.Class} \`` },
      { name: "", value: `Race:  \` ${character.Race} \`` },
      { name: "", value: `Level:  \` ${character.Level} \`` },
      { name: "", value: `XP:  \` ${character.XP} \`` },
      { name: "", value: `HP:  \` ${character.HP} \`` },
      { name: "", value: `MP:  \` ${character.MP} \`` },
      { name: "", value: `Attribute Points:  \` ${character.AttributePoints} \`` },
      { name: "Attributes", value: formatAttributes(character) },
    ],
  };
}

function formatAttributes(character) {
  return `**STR**:  \` ${character.STR} \` | **DEX**:  \` ${character.DEX} \` | **CON**:  \` ${character.CON} \`\n` +
         `**INT**:  \` ${character.INT} \` | **WIS**:  \` ${character.WIS} \` | **CHA**:  \` ${character.CHA} \``;
}
