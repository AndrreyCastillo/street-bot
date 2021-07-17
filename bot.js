'use strict'; // The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
              // With strict mode, you can not, for example, use undeclared variables.

const Discord = require('discord.js'); // Import the discord.js module, the backbone of the progam
const fs = require('fs'); // Node's native file system module (https://nodejs.org/api/fs.html)
const {prefix} = require('./config.json'); // for configurations variables that are public
const env = require('dotenv').config(); // environment variables, unseen to the naked eye

// Create an instance of a Discord bot (https://discord.js.org/#/docs/main/stable/class/Client)
const bot = new Discord.Client(); 

// Kind of like a Map but for discord (https://discordjs.guide/additional-info/collections.html)
bot.commands = new Discord.Collection(); 

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

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
bot.once('ready', () => {
	console.log('StreetBot is ready!');
});

// Create an event listener for messages
bot.on("message", message => {

	if (message.author.bot) return;
	if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

	// When the bot is @'ed
	if (message.mentions.has(bot.user.id)) {
		message.reply('', {files:['./media.street_hey.png']});
	}

	// ----------- HANDLES COMMANDS WITH PREFIX AFTER THIS POINT -------------
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/); // holds any arguments e.g. !ping all; where all is an arg 
	const commandName = args.shift().toLowerCase();

	if (!bot.commands.has(commandName)) return; // if a command given by user is not in our commands folder then return

	const command = client.commands.get(commandName);
	try {
		command.execute(message, args); // executes the execute() function of the command
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});
 
// Log our bot in using the token from https://discord.com/developers/applications
bot.login(process.env.DISCORD_TOKEN);