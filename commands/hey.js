module.exports = {
	name: 'hey',
	description: 'Sreet Hey!',
	guildOnly: false,
	execute(message, args) {
		message.channel.send({ files:['./media/street_hey.jpg'] });
	},
};