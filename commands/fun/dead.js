/* eslint-disable no-unused-vars */
module.exports = {
	name: 'dead',
	description: 'Replies ?alive',
	guildOnly: false,
	execute(message, args) {
		message.channel.send('?alive');
	},
};