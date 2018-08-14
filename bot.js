const Discord = require('discord.js');
const client = new Discord.Client();

// Array of propaganda commissioned by the propaganda minister, Neodex
const phrases = require('./phrases');
const propaganda = phrases.phrases;

var currentHour;
var lastHour;

// Previous two utterances
var reduncancyFilter = new Array(2);

function temp() {
	lastHour = new Date().toLocaleTimeString('it-IT').substring(0,2) - 1;
}

// Client is ready to start working
client.on('ready', () => {
	lastHour = new Date().toLocaleTimeString('it-IT').substring(0,2) - 1;
});

// Spews propaganda every hour
function propagandaMachine() {
	currentHour = new Date().toLocaleTimeString('it-IT').substring(0,2);

	if(currentHour >= 7 && currentHour <= 23) {
		if(currentHour == lastHour + 1) {

			lastHour = currentHour;

			var phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
			while(reduncancyFilter.includes(phrase)){
				phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
			}

			reduncancyFilter[1] = reduncancyFilter[0];
			reduncancyFilter[0] = phrase;

			message.channel.send(phrase);

		}
	}
}

temp();

while(true) {
	propagandaMachine();
}

client.login(process.env.BOT_TOKEN)