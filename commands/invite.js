const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'invite', 
    description: 'gives you the bot invite link',
    aliases: ['i'],
    cooldown: 0,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'invite') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Invite the bot by clicking here!')
      .setURL('https://discord.com/oauth2/authorize?client_id=730644349897015307&scope=bot&permissions=8')
      .addField(`Invite the bot from AYB`, `https://ayblisting.com/bots/730644349897015307`)
      .addField(`Invite the bot from Discord Bot List`, `https://discord.ly/easy-use-bot`)
      .addField(`Invite the bot from Bots for Discord`, `https://botsfordiscord.com/bot/730644349897015307`)
      .addField(`Invite the bot from Aspect Bot List`, `https://sudden-tidal-phalange.glitch.me/bots/730644349897015307`)
      .addField(`Invite the bot from Botrix`, `https://botrix.cc/bots/730644349897015307`)
      .setColor("BLUE")
      .setFooter("Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
      message.channel.send(embed)
    }
    }
}