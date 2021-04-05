const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello Hell!")
})

app.listen(3000, () => {
  console.log("Project is ready!")
})

let Discord = require("discord.js");
let client = new Discord.Client();
const MusicBot = require('discord-music-system');
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");

const mubot = new MusicBot({
    botPrefix: 'w!',
    ytApiKey: 'AIzaSyCnJm58DFJ6bVwdL7nDKo5Ym2HJ3pQ5tWY',
    botClient: client
});

client.on('message', message => {

  // Kill Command
  //if (message.content.startsWith("w!kill")) {
    //let victim = message.mentions.users.first()
    //if(!victim) message.reply("Mention someone to kill!")
    //else {
      //message.channel.send(`${victim} died lol`)
    //}
  //}

  // Pull Command
  if (message.content.startsWith("w!pull")) {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return;
    const member = message.mentions.members.first();
    if (!member) return message.reply("Please mention a member!");
    if (!member.voice.channel) return message.reply("The member you mentioned is not in a voice channel!");
    if (!message.member.voice.channel) return message.reply("Please join a voice channel");
    member.voice.setChannel(message.member.voice.channel);
    message.channel.send("Moved member!")
  }

  // Music
  if(message.content.startsWith(mubot.prefix)) {
        mubot.onMessage(message);
  }

  // Bot Chat
  if (message.content.startsWith("w!c")) {
   let content = message.content.slice(4);
   if(!content) return;
   chatbot.getReply(content).then(r => message.channel.send(r));
  }

  // Restart Bot
  if (message.content === "w!restartbot") {
        message.channel.send("Restarting Bot...")
        .then(msg => client.destroy())
        .then(() => client.login(process.env.token))
        .then(() => message.channel.send("Bot Restarted!"));
  }
});

client.login(process.env.token);