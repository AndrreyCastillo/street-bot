/* eslint-disable no-unused-vars */
const fs = require('fs');
const Promise = require('bluebird');
const randomNumber = require('random-number-csprng');
const garyFolder = fs.readdirSync('./media/gary');

module.exports = {
	name: 'gary',
	description: 'Random gary pictures',
	usage: '',
	guildOnly: false,
	execute(message, args) {
		const garyPictures = [];
		for (const garyPicture of garyFolder) {
			garyPictures.push(garyPicture);
		}
		Promise.try(() => {
			return randomNumber(0, garyPictures.length);
		}).then((number) => {
			const randomPicture = garyPictures[number];
			if (randomPicture === undefined) {
				message.reply({ content: 'You broke the bot momentarily... take this...', files: ['./media/PantsGrab.png'] });
				return;
			}
			message.reply({ files: ['./media/gary/' + randomPicture] });
		});
	},
};