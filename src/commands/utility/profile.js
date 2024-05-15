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
        fields: [],
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