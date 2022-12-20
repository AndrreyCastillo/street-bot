/* eslint-disable no-unused-vars */
const { prefix } = require('./../../../config.json');
const { ChannelType } = require('discord.js');

module.exports = {
	name: 'userinfo',
	description: 'Displays info about a user',
	usage: '@<Username>',
	guildOnly: true,
	async execute(message, args) {
		if (this.guildOnly && message.channel.type === ChannelType.DM) return;

		const members = message.mentions.users;
		if (members.size !== 1) {
			message.reply({ content: 'Usage: `' + prefix + this.name + ' ' + this.usage + '`' });
			return;
		}
		// get the mentioned user
		const member = members.first();
		// if the mention user is the bot, return
		if (member.bot) return;

		const memberId = member.id;
		const memberUsername = member.username;
		const memberDiscriminator = member.discriminator;
		const memberAvatar = member.displayAvatarURL({ dynamic: true });
		const memberAge = formatDate(message, member.createdAt);

		const userFetched = await message.guild.members.fetch(memberId);

		const memberJoinedAt = formatDate(message, userFetched.joinedAt);
		let memberNickname = userFetched.nickname;
		if (memberNickname === null) memberNickname = 'None';

		const memberRoles = userFetched.roles.cache.map(role => role).join(' ');
		const memberRolesCount = memberRoles.split(' ').length;
		if (memberRolesCount === 0) memberRoles.push('None');

		const embed = {
			color: 0xFF0000,
			author: {
				name: memberUsername + '#' + memberDiscriminator,
				icon_url: memberAvatar,
			},
			thumbnail: {
				url: memberAvatar,
			},
			fields: [
				{
					name: 'Id',
					value: memberId,
					inline: true,
				},
				{
					name: 'Nickname',
					value: memberNickname,
					inline: true,
				},
				{
					name: 'Created Date',
					value: memberAge,
				},
				{
					name: 'Joined Date',
					value: memberJoinedAt,
				},
				{
					name: 'Roles [' + memberRolesCount + ']',
					value: memberRoles,
					inline: true,
				},
			],
		};

		message.channel.send({ embeds: [embed] });
	},
};

function formatDate(message, date) {
	const locale = message.guild.preferredLocale;
	const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
	const fDate = date.toLocaleDateString(locale, options);

	return fDate;
}
