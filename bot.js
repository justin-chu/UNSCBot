const Discord = require('discord.js');
const client = new Discord.Client();

// Array of propaganda commissioned by the propaganda minister, Neodex
const phrases = require('./phrases');
const propaganda = phrases.phrases;

// Current hour of the day
const hour = new Date().toLocaleString('it-IT').substring(0,2);

// Previous two utterances
var reduncancyFilter = new Array(2);

// Client is ready to start working
client.on('ready', () => {
	console.log('Bot is ready');
});

// Spews propaganda every hour
client.on('message', function(message) {
	if (message.content === "$loop") { 
		if(hour >= 7 && hour <= 23) {
			var interval = setInterval (function () {

				var phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
				while(reduncancyFilter.includes(phrase)){
					phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
				}

				reduncancyFilter[1] = reduncancyFilter[0];
				reduncancyFilter[0] = phrase;

				console.log(phrase);

				message.channel.send(phrase)
				.catch(console.error);
			}, 3600000); 
		}
	}
});

client.login(process.env.BOT_TOKEN)