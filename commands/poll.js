const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'poll', 
    description: 'creates a poll',
    aliases: ['po'],
    cooldown: 10,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'poll') {
    if (!args) return message.reply("You must have something to vote for!")
    if (!message.content.includes("?")) return message.reply("Please include a ? in your vote!")
    let msgArgs = args.slice(1).join("");
    const embed = new Discord.MessageEmbed()
   .setTitle(message.content.slice(6))
   .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
   .setColor(0x14C9ED)
   .setDescription('React with ✅ if you **agree** and to ❌ if you **disagree**')
   .setAuthor(`🗳 ${message.author.username} started a poll! 🗳`)
   message.channel.send(embed).then(messageReaction => {
   messageReaction.react('✅');
   messageReaction.react('❌');
   message.delete();
  })
}
    }
}