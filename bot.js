const Discord = require('discord.js');
const client = new Discord.Client();

const server = client.guilds.find('name', 'scumbags in paris');

console.log(server.available);
// Channel ID
const channel = server.channels.find('name', 'music-fuckr-n');//"427198981379194890");
console.log(channel);


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
	lastHour = new Date().toLocaleTimeString('it-IT').substring(0,2) - 1;
});

// Spews propaganda every hour
function propagandaMachine() {
	currentHour = new Date().toLocaleTimeString('it-IT').substring(0,2);
	min = new Date().toLocaleTimeString('it-IT').substring(3,5);

	if(currentHour >= 7 && currentHour <= 23 && min == 0) {
		if(currentHour == lastHour + 1) {

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

while(true) {
	propagandaMachine();
}

client.login(process.env.BOT_TOKEN)