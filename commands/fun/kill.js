/* eslint-disable no-unused-vars */
module.exports = {
	name: 'kill',
	description: 'Moves a random person from any voice channel to the afk channel',
	usage: '',
	guildOnly: true,
	execute(message, args) {
		// if command is executed in a dm
		if (this.guildOnly && message.channel.type === 'dm') return message.reply('Nice try');

		// Gets guild from the Message object
		const server = message.guild;
		if(!server.available) {
			message.reply('Nice try');
			// Stops if unavailable
			return;
		}

		const owner = server.ownerID;
		const sender = message.author.id;

		// only server owner can run this command
		if (sender != owner) {
			message.reply('Nice try');
			return;
		}

		const deadChannelID = server.afkChannelID;

		if (deadChannelID === null) {
			message.reply('There\'s no afk channel!!!');
			return;
		}

		const voiceMemberIDs = [];
		const channels = server.channels.cache.filter(channel => channel.type === 'voice');

		for (const [channelID, channel] of channels) {
			if (channelID === deadChannelID) continue;

			for (const [memberID, member] of channel.members) {
				voiceMemberIDs.push(memberID);
			}
		}

		const randomMemberID = voiceMemberIDs[Math.floor(Math.random() * voiceMemberIDs.length)];

		for (const [channelID, channel] of channels) {
			if (channelID === deadChannelID) continue;

			for (const [memberID, member] of channel.members) {
				if (randomMemberID === memberID) {
					member.voice.setChannel(deadChannelID)
						.then(message.channel.send(`See ya, ${member}`))
						.catch(console.error);

					return;
				}
			}
		}

		message.reply('Every one\'s already dead :(');
	},
};