/* eslint-disable no-unused-vars */
const fs = require('fs');

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
		const randomPicture = garyPictures[Math.floor(Math.random() * garyPictures.length)];

		message.reply({ files: ['./media/gary/' + randomPicture] });
	},
};