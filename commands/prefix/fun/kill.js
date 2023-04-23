const crypto = require('crypto');
const { ChannelType } = require('discord.js');

/* eslint-disable no-unused-vars */
module.exports = {
	name: 'kill',
	description: 'Moves a random person from any voice channel to the afk channel',
	usage: '',
	guildOnly: true,
	execute(message, args) {
		// if command is executed in a DM
		if (this.guildOnly && message.channel.type === ChannelType.DM) return;

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
			const roll = 100;
			const memberRoll = crypto.randomInt(1, roll + 1);

			if (memberRoll != roll) {
				message.reply({ content: `Nice try, roll a natural ${roll}. You rolled a ${memberRoll}` });
				return;
			}
		}

		const deadChannelId = server.afkChannelId;
		if (deadChannelId === null) {
			message.reply({ content: 'There\'s no afk channel!!!' });
			return;
		}

		const voiceMembers = server.members.cache.filter(member => member.voice.channel && member.voice.channel.id !== deadChannelId);

		if (voiceMembers.size == 0) {
			message.reply({ content: 'Every one\'s already dead :(' });
			return;
		}

		const arrayMemberIds = Array.from(voiceMembers.keys());
		const randomMemberId = arrayMemberIds[crypto.randomInt(0, arrayMemberIds.length)];
		const randomMember = voiceMembers.get(randomMemberId);
		randomMember.voice.setChannel(deadChannelId)
			.then(message.channel.send({ content: `See ya, ${randomMember}` }))
			.catch(console.error);
	},
};
