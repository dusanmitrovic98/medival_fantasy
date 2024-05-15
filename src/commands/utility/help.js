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
            name: "**\nGeneral:**",
            value: "",
            inline: false,
          }, 
          {
            name: "/\`user\`",
            value: "",
            inline: false,
          }, 
          {
            name: "/\`server\`",
            value: "",
            inline: false,
          }, 
          {
            name: "/\`register\`",
            value: "",
            inline: false,
          }, 
          {
            name: "/\`unsubscribe\`",
            value: "",
            inline: false,
          },
          {
            name: "**\nCharacters:**",
            value: "",
            inline: false,
          }, 
          {
            name: "/\`profile\`",
            value: "",
            inline: false,
          },
          {
            name: "/\`create-character\` [name] [class] [race]",
            value: "",
            inline: false,
          },
          {
            name: "/\`my-characters\`",
            value: "",
            inline: false,
          },
          {
            name: "/\`remove-character\` [character-id]",
            value: "",
            inline: false,
          },
          // {
          //   name: "/\`power-up\` [character-id] [stat-name] [amount]",
          //   value: "",
          //   inline: false,
          // },
          {
            name: "/\`power-up\` [stat-name] [amount]",
            value: "",
            inline: false,
          },
          // {
          //   name: "/\`reset-stats\` [character-id]",
          //   value: "",
          //   inline: false,
          // },
          {
            name: "/\`reset-stats\`",
            value: "",
            inline: false,
          },
          {
            name: "**\nDND:**",
            value: "",
            inline: false,
          }, 
          {
            name: "/\`d20\`",
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