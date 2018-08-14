const Discord = require('discord.js');
const client = new Discord.Client();
var guild;
var channel;

// Array of propaganda commissioned by the propaganda minister, Neodex
const phrases = require('./phrases');
const propaganda = phrases.phrases;

var currentHour;
var lastHour;
var min;

// Previous two utterances
var reduncancyFilter = new Array(2);

// Client is ready to start working
client.on('ready', () => {
	console.log('Bot is ready');

	var guilds = client.guilds;
	guilds.forEach(function (g) {
		console.log(g.name);
		guild = g;
	});
	channel = guild.channels.first();
	console.log(channel.name);

	lastHour = new Date().toLocaleTimeString('it-IT').substring(0,2) - 1;
});

// Spews propaganda every hour
function propagandaMachine() {
	currentHour = new Date().toLocaleTimeString('it-IT').substring(0,2);
	min = new Date().toLocaleTimeString('it-IT').substring(3,5);
		console.log('1');
	if(currentHour >= 7 && currentHour <= 23 && min == 0) {
		console.log('2');
		if(currentHour == lastHour + 1) {
		console.log('3');

			lastHour = currentHour;

			var phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
			while(reduncancyFilter.includes(phrase)){
				phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
			}

			reduncancyFilter[1] = reduncancyFilter[0];
			reduncancyFilter[0] = phrase;

			console.log(phrase);
			channel.send(phrase);

		}
	}
}

setInterval(propagandaMachine, 60000);

		console.log('4');

client.login(process.env.BOT_TOKEN)