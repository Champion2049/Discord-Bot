const Discord = require('discord.js');
/*const client = new Discord.Client
const db = require('quick.db')
module.exports = {
    name: 'serverlist', 
    description: 'gives the server list',
    aliases: ['serverl'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'serverlist') {
        client.guilds.cache.forEach(guild => {
        message.channel.send(`${guild.name} | ${guild.id}`);
      })      
}
    }
}*/