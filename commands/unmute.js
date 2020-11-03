const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'unmute', 
    description: 'unmutes a muted member',
    aliases: ['un'],
    cooldown: 5,
    execute(message){
            const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
            if(!message.content.startsWith(prefix) || message.author.bot) return;
            const args = message.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();
          if (command === 'unmute') {
              if(!args[0]) return message.channel.send("Please mention the member to unmute!")
              if(!args[0] == message.guild.members) return message.channel.send("That member is not in the server!")
              if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("You don't have the permission to advocate this command")
              if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send("I don't have the permission to advocate this command")
              let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
              let user = message.mentions.users.first();
              if (!user.roles.has(muterole)) return message.reply(`That member is :no_entry_sign: muted!`);
              else {user.removeRole(role) 
                return message.channel.send(`${user} has been unmuted!`)}
          
          }
    }
}