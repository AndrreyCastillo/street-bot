module.exports = {
	name: 'dead',
	description: 'Replies ?alive',
	execute(message, args) {
		message.channel.send('?alive');
	}
};