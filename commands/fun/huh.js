const fs = require('fs');

module.exports = {
	name: 'huh',
	description: 'Picture of StreetRat',
	execute(message, args) {

        message.channel.send('', {files:['./media/street_huh.jpg']});
	}
};