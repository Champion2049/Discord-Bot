const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'warn', 
    description: 'warns the mentioned member',
    aliases: ['w'],
    cooldown: 15,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'warn'){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');
  if (reason.length < 1) return message.reply('You must have a reason for the warning.');
  let dmsEmbed = new Discord.MessageEmbed()
  .setTitle("Warn")
  .setColor("BLUE")
  .setDescription(`You have been warned on \`${message.guild.name}\``)
  .addField("Warned by", message.author.tag)
  .addField("Reason", reason)
  .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256');
  user.send(dmsEmbed);
  message.delete();
  message.channel.send(`${user.tag} has been warned`)
}
    }
}