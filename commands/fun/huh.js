/* eslint-disable no-unused-vars */
module.exports = {
	name: 'huh',
	description: 'Picture of StreetRat',
	guildOnly: false,
	execute(message, args) {

		message.channel.send({ files:['./media/street_huh.jpg'] });
	},
};