const Discord = require('discord.js');
const db = require('quick.db')
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(/*"AIzaSyB_-z54JR-_BSQUg2JdF4CpQ9KYu9UkYws"*/"AIzaSyCyr33G7A1pDclHJVeeHueAZnItOGO1O4s");
module.exports = {
    name: 'youtube', 
    description: 'searches youtube',
    aliases: ['yt'],
    cooldown: 5,
    async execute(message){
            const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
            if(!message.content.startsWith(prefix) || message.author.bot) return;
                 const args = message.content.slice(prefix.length).split(/ +/);
                 const command = args.shift().toLowerCase();
                 if(command === 'youtube'){
                  if(args.length < 1) message.channel.send('I need to know what to search...');
                  const video = await youtube.searchVideos(args);
                  message.channel.send(`https://www.youtube.com/watch?v=${video.id}`);
                  console.log(video);
                 }
    }
}