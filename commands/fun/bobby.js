/* eslint-disable no-unused-vars */
const fs = require('fs');
const Promise = require('bluebird');
const randomNumber = require('random-number-csprng');
const bobbyFolder = fs.readdirSync('./media/bobby');

module.exports = {
	name: 'bobby',
	aliases: ['booby', 'brabb',],
	description: 'Random bobby pictures',
	usage: '',
	guildOnly: false,
	execute(message, args) {
		const bobbyPictures = [];
		for (const bobbyPicture of bobbyFolder) {
			bobbyPictures.push(bobbyPicture);
		}

		Promise.try(() => {return randomNumber(0, bobbyPictures.length - 1);}).then((number) => {
			const randomPicture = bobbyPictures[number];}
			message.reply({ files: ['./media/bobby/' + randomPicture] });
		});
	},
};
