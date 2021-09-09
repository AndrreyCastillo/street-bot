/* eslint-disable no-unused-vars */
const fs = require('fs');
const Promise = require('bluebird');
const randomNumber = require('random-number-csprng');
module.exports = {
	name: 'gary',
	description: 'Random gary pictures',
	guildOnly: false,
	execute(message, args) {
		const garyFolder = fs.readdirSync('./media/gary');
		const garyPictures = [];
		for (const garyPicture of garyFolder) {
			garyPictures.push(garyPicture);
		}
		Promise.try(() => {
			return randomNumber(0, garyPictures.length);
		}).then((number) => {
			const randomPicture = garyPictures[number];
			message.reply({ files: ['./media/gary/' + randomPicture] });
		});
	},
};