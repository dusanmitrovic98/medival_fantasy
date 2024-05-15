const { Client, Collection, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

const { token } = require('./config.json');
const { connect } = require('./db.js');

const baseDir = path.join(__dirname, 'src');

// MongoDB Client

connect();

// Discord Bot
const clientBot = new Client({ intents: [GatewayIntentBits.Guilds] });

clientBot.cooldowns = new Collection();
clientBot.commands = new Collection();
const foldersPath = path.join(baseDir, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			clientBot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(baseDir, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		clientBot.once(event.name, (...args) => event.execute(...args));
	} else {
		clientBot.on(event.name, (...args) => event.execute(...args));
	}
}

clientBot.login(token);