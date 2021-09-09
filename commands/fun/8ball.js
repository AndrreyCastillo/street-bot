/* eslint-disable no-unused-vars */
const Promise = require('bluebird');
const randomNumber = require('random-number-csprng');
const { eightball_answers } = require('./../../config.json');

module.exports = {
	name: '8ball',
	description: '8ball of Truth',
	guildOnly: false,
	execute(message, args) {
		if (args.length === 0) return;

		Promise.try(() => {
			return randomNumber(0, eightball_answers.length);
		}).then((number) => {
			message.reply(eightball_answers[number]);
		});
	},
};