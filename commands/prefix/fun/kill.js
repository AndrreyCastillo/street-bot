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
			message.reply({ content: 'Nice try' });
			return;
		}

		const deadChannelId = server.afkChannelId;
		if (deadChannelId === null) {
			message.reply({ content: 'There\'s no afk channel!!!' });
			return;
		}

		const voiceMembers = message.guild.members.cache.filter(member => member.voice.channel && member.voice.channel.id !== deadChannelId);

		if (voiceMembers.size == 0) {
			message.reply({ content: 'Every one\'s already dead :(' });
			return;
		}

		const randomMember = voiceMembers[crypto.randomInt(0, voiceMembers.length)];
		randomMember.voice.setChannel(deadChannelId)
			.then(message.channel.send({ content: `See ya, ${randomMember}` }))
			.catch(console.error);
	},
};
