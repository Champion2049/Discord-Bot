const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'support', 
    description: 'gives the support server invite',
    aliases: ['sup'],
    cooldown: 3,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'support') {
    const embed = new Discord.MessageEmbed()
    .setTitle("Join our support server!")
    .setURL('https://discord.gg/kxgrnGP')
    .setDescription('Join our support server if you need any more assistance')
    .setColor("BLUE")
    message.channel.send(embed);
  }
    }
}