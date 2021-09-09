/* eslint-disable no-unused-vars */
const fs = require('fs');
const { prefix } = require('./../../config.json');

module.exports = {
	name: 'help',
	description: 'Lists commands',
	usage: '',
	guildOnly: false,
	execute(message, args) {
		const commandHelp = [];

		const commandFolders = fs.readdirSync('./commands');
		for (const folder of commandFolders) {

			// The fs.readdirSync() method will return an array of all the file names in a directory, e.g. ['ping.js', 'beep.js']
			// .filter() makes sure we only use command files
			const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const command = require(`./../../commands/${folder}/${file}`);

				commandHelp.push(command);
			}
		}

		const fields = [];
		for (const command of commandHelp) {
			fields.push({
				name: '`' + prefix + command.name + '`',
				value: command.description,
				inline: true,
			});
		}
		const embed = {
			color: 0xFF0000,
			title: 'List of Supported Commands',
			fields: fields,
		};

		message.channel.send({ embed: embed });
	},
};