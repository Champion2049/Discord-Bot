const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'botinfo', 
    description: 'gives the information about the bot',
    aliases: ['bot'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'botinfo') {
    let inline = true
    let bicon = client.user.displayAvatarURL;
    let usersize = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    let chansize = client.channels
    let uptimxd = client.uptime 
    let servsize = client.guilds.cache.size
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let botembed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setThumbnail(`https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256`)
    .addField("Bot Name", `<a:nitroboost:744884824015110204>${client.user.username}<a:nitroboost:744884824015110204>`, inline)
    .addField("Bot Owner", "<a:crown:744885017511198791> Champion2049#3714" , inline )
    .addField("Bot ID", '<:005idcard:744890183782236201>  730644349897015307')
    .addField("Servers", `<:Discord:744889665164804157> ${servsize}`, inline)
    .addField("Users", `<a:dc:744888395041341460>${usersize}`, inline)
    .addField("Bot Library", "<:Visual_Studio_Code:744887180849053696> Discord.js", inline)
    .addField("Created On",`<a:UnderConstruction:744891721854222367>${client.user.createdAt}`)
    .addField("Bot Version", `<:version:744891034152075345>${version}`)
    .addField("Uptime", `<a:Timer:744890944557678722>${days}d ${hours}h ${minutes}m ${seconds}s`)
    .setTitle(`Click here to Invite the bot!`)
    .setURL('https://discordapp.com/oauth2/authorize?client_id=730644349897015307&scope=bot&permissions=2146958847')
    .setFooter(`Information about: ${client.user.username}. Developed by: Champion2049`, 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
    .setTimestamp()
    
    message.channel.send(botembed);
  }
    }
}