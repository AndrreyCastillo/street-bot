/* eslint-disable no-unused-vars */
const crypto = require('crypto');
const { eightball_answers } = require('./../../../config.json');

module.exports = {
	name: '8ball',
	description: '8-Ball of Truth',
	usage: '<Question>',
	guildOnly: false,
	execute(message, args) {
		if (args.length === 0) return;

		const number = crypto.randomInt(0, eightball_answers.length);
		const answer = eightball_answers[number];

		message.reply({ content: answer });
	},
};
