const Discord = require('discord.js');
const db = require('quick.db')
const ms = require("ms");
const {timeStamp} = require('console');
module.exports = {
    name: 'mute', 
    description: 'timed mute',
    aliases: ['m'],
    cooldown: 15,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        if(!message.content.startsWith(prefix) || message.author.bot) return;
             const args = message.content.slice(prefix.length).split(/ +/);
             const command = args.shift().toLowerCase();
             if (command === 'mute') {
        const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!tomute) return message.reply("Couldn't find user.");
        let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
        let removerole = message.guild.roles.cache.find(removerole => removerole.name === "Member")
        if(!muterole){
            message.guild.roles.create({ data: { name: 'Muted', permissions: 0,reason: 'Muted role not present in server!' } }); 
          }
          if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("You don't have the permission to advocate this command")
        if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send("I don't have the permission to advocate this command")
        let mutetime = args[1];
        if(!mutetime) return message.reply("You didn't specify a time!");
      
        await(tomute.roles.add(muterole)) 
        message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
      
        setTimeout(function(){
          tomute.roles.remove(muterole);
          message.channel.send(`<@${tomute.id}> has been unmuted!`);
        }, ms(mutetime));
      }
    }
}