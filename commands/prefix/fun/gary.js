/* eslint-disable no-unused-vars */
const fs = require('fs');
const crypto = require('crypto');
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
		const number = crypto.randomInt(0, garyPictures.length);

		const randomPicture = garyPictures[number];

		message.reply({ files: ['./media/gary/' + randomPicture] });
	},
};
