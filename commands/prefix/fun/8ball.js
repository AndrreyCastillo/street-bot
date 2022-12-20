/* eslint-disable no-unused-vars */
const Promise = require('bluebird');
const randomNumber = require('random-number-csprng');
const { eightball_answers } = require('./../../../config.json');

module.exports = {
	name: '8ball',
	description: '8-Ball of Truth',
	usage: '<Question>',
	guildOnly: false,
	execute(message, args) {
		if (args.length === 0) return;
		Promise.try(() => {
			return randomNumber(0, eightball_answers.length);
		}).then((number) => {
			const answer = eightball_answers[number];
			if (answer === undefined) return;
			message.reply({ content: answer });
		});
	},
};
