// The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables.
'use strict';

// Import the discord.js module, the backbone of the progam
const Discord = require('discord.js');

// Node's native file system module (https://nodejs.org/api/fs.html)
const fs = require('fs');

// environment variables, unseen to the naked eye
// eslint-disable-next-line no-unused-vars
const env = require('dotenv').config();

// Create an instance of a Discord bot (https://discord.js.org/#/docs/main/stable/class/Client)
const bot = new Discord.Client();

// Kind of like a Map but for discord (https://discordjs.guide/additional-info/collections.html)
bot.commands = new Discord.Collection();

// initialize bot.commands
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {

	// The fs.readdirSync() method will return an array of all the file names in a directory, e.g. ['ping.js', 'beep.js']
	// .filter() makes sure we only use command files
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);

		// set a new item in the bot.commands Collection
		// with the key as the command name and the value as the exported module
		bot.commands.set(command.name, command);
	}
}

// send events to proper file
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, bot));
	}
	else {
		bot.on(event.name, (...args) => event.execute(...args, bot));
	}
}

// Log our bot in using the token from https://discord.com/developers/applications
bot.login(process.env.DISCORD_TOKEN);