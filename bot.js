const Discord = require('discord.js');
const client = new Discord.Client();

// Specific server and channel
var guild;
var channel;

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

	// Get guild and channel
	var guilds = client.guilds;
	guilds.forEach(function (g) {
		guild = g;
	});
	channel = guild.channels.find('name', 'on-duty');
	console.log(channel.name);
});

client.on('message', message => {
    if(message.content.toLowerCase().substring(0, 8) === '!unscbot'){
        message.reply('I am a propaganda bot commisioned by Admiral Neodex.');
    }
});

client.on('message', message => {
    if(message.content.toLowerCase().substring(0, 8) === 'solipsil') {
        if(message.author.username === 'Neodex') {
            message.reply('Aye aye admiral.');
        }
        else {
            message.reply('Reporting for duty.');
        }
    }
});

// Spews propaganda every hour
function propagandaMachine() {
	currentHour = new Date().getUTCHours();
	min = new Date().getUTCMinutes();	
	console.log(`${currentHour}, ${min}`);

	// If the time is between 7AM and 11PM on the dot
	if(((currentHour >= 11 && currentHour <= 23) || (currentHour >= 0 && currentHour <= 3)) && min == 0) {  // Between 7AM to 11PM EST

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

	}
}

// Call function every minute
setInterval(propagandaMachine, 60000);

// Login with environmental bot token
client.login(process.env.BOT_TOKEN)
