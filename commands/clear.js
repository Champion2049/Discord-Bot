const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'clear', 
    description: 'clears a mentioned amount of messages',
    aliases: ['c'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        if(!message.content.startsWith(prefix) || message.author.bot) return;
             const args = message.content.slice(prefix.length).split(/ +/);
             const command = args.shift().toLowerCase();
             if(command === 'clear'){
      if(args[0] == "clear"){
        let helpembxd = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .addField(`clear Command", "Usage: ${prefix}clear <amount>`)
        message.channel.send(helpembxd);
        return;
      } 
      message.delete()
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premssions to do that!");
      if(!args[0]) return message.channel.send('Please enter a number of messages to clear! `Usage: dcclear <amount>`');
      message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`**__Cleared ${args[0]} messages.__**`).then(msg => msg.delete({ timeout: 3000 }));
      })
             }
    }
}