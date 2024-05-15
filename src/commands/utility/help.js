const { SlashCommandBuilder } = require("discord.js");
const User = require("../../services/users/user.model.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("View list of commands available."),
  async execute(interaction) {
    try {
      const exampleEmbed = {
        title: `Command List`,
        description: '',
        color: 0x0099ff,
        fields: [
          {
            name: "/register",
            value: "",
            inline: false,
          }, 
          {
            name: "/unsubscribe",
            value: "",
            inline: false,
          },
          {
            name: "/profile",
            value: "",
            inline: false,
          },
          {
            name: "/create-character",
            value: "",
            inline: false,
          }
        ],
      };

      await interaction.reply({ embeds: [exampleEmbed] });
    } catch (error) {
      console.error(error);
    }
  },
};