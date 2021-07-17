const fs = require('fs');

module.exports = {
	name: 'gary',
	description: 'Random gary pictures',
	execute(message, args) {

        const garyFolder = fs.readdirSync('./media/gary');
        let garyPictures = []
        for (const garyPicture of garyFolder) {
            garyPictures.push(garyPicture)
        }
        const randomPicture = garyPictures[Math.floor(Math.random()*garyPictures.length)];

        message.reply({files: ["./media/"+randomPicture]});
	}
};