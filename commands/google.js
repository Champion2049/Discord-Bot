const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'google', 
    description: 'searches google',
    aliases: ['go'],
    cooldown: 3,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        if(!message.content.startsWith(prefix) || message.author.bot) return;
             const args = message.content.slice(prefix.length).split(/ +/);
             const command = args.shift().toLowerCase();
             if(command === 'google'){
          if(args.length < 1)return message.channel.send('I need to know what to search...') 
          else{ return message.channel.send('\nhttps://google.com/search?q='+args)}
      }
    }
}