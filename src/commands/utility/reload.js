const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('The command to reload.')
        .setRequired(true)
        .addChoices(
          { name: "user", value: "user" },
          { name: "server", value: "server" },
          { name: "register", value: "register" },
          { name: "unsubscribe", value: "unsubscribe" },
          { name: "profile", value: "profile" },
          { name: "create-character", value: "create-character" },
          { name: "my-characters", value: "my-characters" },
          { name: "remove-character", value: "remove-character" },
          { name: "power-up", value: "power-up" },
          { name: "reset-stats", value: "reset-stats" },
          { name: "d20", value: "d20" },
        )
    ),
  async execute(interaction) {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }

    delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

    try {
      interaction.client.commands.delete(command.data.name);
      const newCommand = require(`../${command.category}/${command.data.name}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
    }
  },
};
