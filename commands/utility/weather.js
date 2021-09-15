/* eslint-disable no-unused-vars */
const { prefix } = require('./../../config.json');
const axios = require('axios');
const env = require('dotenv').config();

module.exports = {
	name: 'weather',
	description: 'Shows the weather of a provided city',
	usage: '<City>',
	guildOnly: false,
	execute(message, args) {
		if (args.length < 1) {
			message.reply('Usage: `' + prefix + this.name + ' ' + this.usage + '`');
			return;
		}
		let CITY = '';
		args.forEach(word => { CITY += word + ' ';});

		const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${process.env.WEATHER_API_TOKEN}&units=imperial`;

		axios.get(`${URL}`).then(response => {
			// const author = message.author.username;
			// const profile = message.author.displayAvatarURL({ dynamic: true });

			const apiData = response;
			const currentTemp = Math.ceil(apiData.data.main.temp);
			const maxTemp = Math.round(apiData.data.main.temp_max);
			const minTemp = Math.round(apiData.data.main.temp_min);
			const feelsLike = Math.round(apiData.data.main.feels_like);
			const humidity = apiData.data.main.humidity;
			// const wind = apiData.data.wind.speed;
			const icon = apiData.data.weather[0].icon;
			const cityName = apiData.data.name;
			const country = apiData.data.sys.country;
			// const pressure = apiData.data.main.pressure;
			const weatherMain = apiData.data.weather[0].main;
			const weatherDescription = apiData.data.weather[0].description;

			const timezone = apiData.data.timezone;

			const locale = message.guild.preferredLocale;
			const options = { hour: 'numeric', minute: 'numeric' };

			let sunrise = new Date(0);
			let sunset = new Date(0);
			sunrise.setUTCSeconds(apiData.data.sys.sunrise);
			sunset.setUTCSeconds(apiData.data.sys.sunset);

			sunrise = sunrise.toLocaleTimeString(locale, options);
			sunset = sunset.toLocaleTimeString(locale, options);

			const embed = {
				color: 0xFF0000,
				title: `__Weather Now__\nIt's ${currentTemp} \u00B0F in ${cityName}, ${country}`,
				thumbnail: {
					url: `http://openweathermap.org/img/w/${icon}.png`,
				},
				fields: [
					{
						name: 'Weather',
						value: `${weatherMain}: ${weatherDescription}`,
					},
					{
						name: 'Max. Temp.',
						value: `${maxTemp} \u00B0F`,
						inline: true,
					},
					{
						name: 'Min. Temp.',
						value: `${minTemp} \u00B0F`,
						inline: true,
					},
					{
						name: 'Feels Like',
						value: `${feelsLike} \u00B0F`,
						inline: true,
					},
					{
						name: 'Humidity',
						value: `${humidity}%`,
						inline: true,
					},
					{
						name: 'Sunrise ',
						value: `${sunrise} (CST)`,
						inline: true,
					},
					{
						name: 'Sunset',
						value: `${sunset} (CST)`,
						inline: true,
					},
				],
			};
			message.channel.send({ embed: embed });
		}).catch((error) => {
			message.reply('Enter a valid city name');
			console.log(error);
		});
	},
};
