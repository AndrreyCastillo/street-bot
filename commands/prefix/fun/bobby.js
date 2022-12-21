/* eslint-disable no-unused-vars */
const fs = require('fs');
const crypto = require('crypto');
const bobbyFolder = fs.readdirSync('./media/bobby');

module.exports = {
	name: 'bobby',
	aliases: ['booby', 'brabb', 'bobbert', 'boobshwee', 'bob', 'robert', 'bobillamus'],
	description: 'Random bobby pictures',
	usage: '',
	guildOnly: false,
	execute(message, args) {
		const bobbyPictures = [];
		for (const bobbyPicture of bobbyFolder) {
			bobbyPictures.push(bobbyPicture);
		}
		const number = crypto.randomInt(0, bobbyPictures.length);
		const randomPicture = bobbyPictures[number];
		message.reply({ files: ['./media/bobby/' + randomPicture] });
	},
};
