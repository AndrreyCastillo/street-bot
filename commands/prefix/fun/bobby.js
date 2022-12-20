/* eslint-disable no-unused-vars */
const fs = require('fs');
const Promise = require('bluebird');
const randomNumber = require('random-number-csprng');
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
		Promise.try(() => {
			return randomNumber(0, bobbyPictures.length - 1);
		}).then((number) => {
			const randomPicture = bobbyPictures[number];
			// this if statement should never true after this fix??
			if (randomPicture === undefined) {
				message.reply({ content: 'You broke the bot momentarily... take this...', files: ['./media/PantsGrab.png'] });
				return;
			}
			message.reply({ files: ['./media/bobby/' + randomPicture] });
		});
	},
};
