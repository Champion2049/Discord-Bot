const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'serverinfo', 
    description: 'shows the current server info',
    aliases: ['s'],
    cooldown: 10,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        if(!message.content.startsWith(prefix) || message.author.bot) return;
             const args = message.content.slice(prefix.length).split(/ +/);
             const command = args.shift().toLowerCase();
        if (command === 'serverinfo') {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }
        
        const verifLevels = ["None", "Low", "Medium", "High", "Highest"];
      const embed = new Discord.MessageEmbed()
      .setTitle("**Server Information**")
      .addField("Name", `<:Discord:744889665164804157> ${message.guild.name}`, true)
      .addField("ID", `<:005idcard:744890183782236201> ${message.guild.id}`, true)
      .addField("Owner", `<a:crown:744885017511198791> ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField("Region", `🏘 ${message.guild.region}`, true)
      .addField("Total | Humans | Bots", `<a:dc:744888395041341460> ${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .addField("Verification Level", `<a:lcgreen:745884544309133352> ${message.guild.verificationLevel}`, true)
      .addField("Channels", `<:version:744891034152075345> ${message.guild.channels.cache.size}`, true)
      .addField("Roles", `📋 ${message.guild.roles.cache.size}`, true)
      .addField("Emoji Count", `<a:nitroboost:744884824015110204> This server has ${message.guild.emojis.cache.size} emojis <a:nitroboost:744884824015110204>`)
      .addField("Creation Date", `<a:Timer:744890944557678722> ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
      .addField("You Joined the server on", `<a:chahal_welcome:758211451046723585> ${message.member.joinedAt}`)
      .setColor("BLUE")
      .setFooter(`Information about: ${message.guild.name} provided by Easy Use Bot\n Bot made by Champion2049#3714`, 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
      .setThumbnail(message.guild.iconURL)
      message.channel.send({embed});
      }
    }
}