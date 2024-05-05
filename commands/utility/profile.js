const { SlashCommandBuilder } = require("discord.js");
const User = require("../../services/users/user.model.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("View your profile"),
  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const user = await User.findOne({ userId: userId });

      if (!user) {
        await interaction.reply(
          "You are not registered. Use the /register command to register."
        );
        return;
      }

      const exampleEmbed = {
        title: `${interaction.user.username}'s Profile 🛡️`,
        description: "Here is your character profile:",
        color: 0x0099ff,
        fields: [
          {
            name: "Character Name",
            value: user.characterName,
            inline: false,
          },
          {
            name: "Character Class",
            value: user.characterClass,
            inline: false,
          },
          {
            name: "Character Race",
            value: user.characterRace,
            inline: false,
          },
          {
            name: "Character Level",
            value: user.characterLevel,
            inline: false,
          },
          {
            name: "Character XP",
            value: user.characterXP,
            inline: false,
          },
          {
            name: "Character HP",
            value: user.characterHP,
            inline: false,
          },
          {
            name: "Character MP",
            value: user.characterMP,
            inline: false,
          },
          {
            name: "Stats:",
            value: `STR: ${user.characterSTR}\nDEX: ${user.characterDEX}\nCON: ${user.characterCON}\nINT: ${user.characterINT}\nWIS: ${user.characterWIS}\nCHA: ${user.characterCHA}`,
          },
        ],
      };

      await interaction.reply({ embeds: [exampleEmbed] });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "There was an error fetching your profile. Please try again later."
      );
    }
  },
};
