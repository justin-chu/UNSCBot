const Discord = require('discord.js');
const client = new Discord.Client();

// Specific servers and channels
var guild;
var channel;
var UNSCguild;
var UNSCchannel;

// Array of propaganda commissioned by the propaganda minister, Neodex
const phrases = require('./phrases');
const propaganda = phrases.phrases;

// Time based on 24-hour clocks
var currentHour;
var min;

// Previous two utterances
var reduncancyFilter = new Array(2);

// Client is ready to start working
client.on('ready', () => {
	console.log('Bot is ready');

	// Get guilds and channels
	var guilds = client.guilds;
	guilds[0] = guild;
	channel = guild.channels.find('name', 'music-fuckr-n');

	guilds[1] = UNSCguild;
	UNSCchannel = UNSCguild.channels.find('name', 'United Nations Space Command');

	console.log(UNSCguild.name);
	console.log(UNSCchannel.name);
});

// Spews propaganda every hour
function propagandaMachine() {
	currentHour = new Date().toLocaleTimeString('it-IT').substring(0,2);
	min = new Date().toLocaleTimeString('it-IT').substring(3,5);

	// If the time is between 7AM and 11PM on the dot
	if(currentHour >= 7 && currentHour <= 23 && min == 0) {

		// Get random, non-repetitive phrase
		var phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
		while(reduncancyFilter.includes(phrase)){
			phrase = propaganda[Math.floor(Math.random()*propaganda.length)];
		}

		// Add phrase to alrady-said array
		reduncancyFilter[1] = reduncancyFilter[0];
		reduncancyFilter[0] = phrase;

		console.log(phrase);
		channel.send(phrase);
		UNSCchannel.send(phrase);

	}
}

// Call function every minute
setInterval(propagandaMachine, 60000);

// Login with environmental bot token
client.login(process.env.BOT_TOKEN)