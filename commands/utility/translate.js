/* eslint-disable no-unused-vars */
const { prefix } = require('./../../config.json');
const axios = require('axios');

module.exports = {
	name: 'translate',
	description: 'Translate text to any language',
	usage: '<FROM> <TO> <TEXT>',
	guildOnly: false,
	execute(message, args) {
		message.reply('Temp');

		if (args.length < 3) {
			message.reply('Usage: `' + prefix + this.name + ' ' + this.usage + '`');
			return;
		}
	},
};