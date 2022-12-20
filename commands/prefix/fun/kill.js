const { ChannelType } = require('discord.js');

/* eslint-disable no-unused-vars */
module.exports = {
	name: 'kill',
	description: 'Moves a random person from any voice channel to the afk channel',
	usage: '',
	guildOnly: true,
	execute(message, args) {
		// if command is executed in a DM
		if (this.guildOnly && message.channel.type === ChannelType.DM) return message.reply('Nice try');

		// Gets guild from the Message object
		const server = message.guild;
		if(!server.available) {
			message.reply({ content: 'Nice try' });
			// Stops if unavailable
			return;
		}

		const owner = server.ownerId;
		const sender = message.author.id;

		// only server owner can run this command
		if (sender != owner) {
			message.reply({ content: 'Nice try' });
			return;
		}

		const deadChannelId = server.afkChannelId;

		if (deadChannelId === null) {
			message.reply({ content: 'There\'s no afk channel!!!' });
			return;
		}

		const voiceMemberIds = [];
		const channels = server.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);

		for (const [channelId, channel] of channels) {
			if (channelId === deadChannelId) continue;

			for (const [memberId, member] of channel.members) {
				voiceMemberIds.push(memberId);
			}
		}

		const randomMemberId = voiceMemberIds[Math.floor(Math.random() * voiceMemberIds.length)];

		for (const [channelId, channel] of channels) {
			if (channelId === deadChannelId) continue;

			for (const [memberId, member] of channel.members) {
				if (randomMemberId === memberId) {
					member.voice.setChannel(deadChannelId)
						.then(message.channel.send({ content: `See ya, ${member}` }))
						.catch(console.error);

					return;
				}
			}
		}

		message.reply({ content: 'Every one\'s already dead :(' });
	},
};
