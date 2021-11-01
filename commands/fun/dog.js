/* eslint-disable no-unused-vars */
const { prefix } = require('./../../config.json');
const axios = require('axios');
const env = require('dotenv').config();

module.exports = {
	name: 'dog',
	description: 'Shows a random dog',
	usage: '',
	guildOnly: false,
	execute(message, args) {
		// if (args.length < 1) {
		// 	message.reply('Usage: `' + prefix + this.name + ' ' + this.usage + '`');
		// 	return;
		// }

		const URL = 'https://api.thedogapi.com/v1/images/search';

		axios.get(`${URL}`).then(response => {

			const apiData = response;
			const url = apiData.data[0].url;

			message.reply({ files: [url] });
		}).catch((error) => {
			message.reply('You broke it...');
			console.log(error);
		});
	},
};
