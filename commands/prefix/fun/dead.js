/* eslint-disable no-unused-vars */
module.exports = {
	name: 'dead',
	description: 'Replies ?alive',
	usage: '',
	guildOnly: false,
	execute(message, args) {
		message.channel.send({ content: '?alive' });
	},
};
