const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const parse = require('csv-parse');
const sample = './text.csv';
var array
var fp
var num
var chats = 0
var botKey = process.env.BOT_KEY_OBOT;

client.login(botKey);

client.on('ready', readyDiscord);
client.on('message', npcReply);

function readyDiscord() {
	console.log("Welcome to Oblivion");
	fs.readFile(sample, (err, data) => {
		if (err) throw err;
		parse(data, {columns: false, trim: true}, function(err, rows) {
			array = rows
		});
	});
	console.log("Dialogue loaded!");
	client.user.setActivity('Becoming the Hero of Kvatch!');
}

function npcReply(msg) {
	if (msg.mentions.has(client.user)) {
		if (msg.content.includes('!count')) {
			var dlg = 'I have had ' + chats + ' lovely chats with you guys!';
		}
		else if (msg.content.includes('!help')) {
			msg.author.send('Mention me with no command to have a chat with me');
			msg.author.send('Use !count to see how many chats I\'ve had with you guys');
			msg.author.send('Use !DMme to recieve a special DM me ;)');
			client.user.setActivity('Helping the PCs');
			var dlg = 'Check your DMs to see what commands you can use to interact with me';
		}
		else if (msg.content.includes('!DMme')) {
			msg.author.send('uh oh stinky');
			client.user.setActivity('Exploring the planes of Oblivion')
			var dlg = 'Okay check your DMs ;)';
		}
		else {
			chats = chats + 1;
			client.user.setActivity('Chatting with the PCs');	
			var dlg = array[Math.floor(Math.random()*array.length)];
		}
		msg.reply(dlg)
	}
}

function nmbrGame(number) {
	return number === getRandomInt(10);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function hasNumber(string) {
	return /\d/.test(string);
}
