const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'ping', 
    description: 'gives the bot ping',
    aliases: ['p'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
       if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'ping'){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var embed = new Discord.MessageEmbed()
            .setAuthor(`The Bot's current ping is ${ping}ms`)
            .setColor("BLUE")
            m.edit(embed)
        })
    }
    }
}