const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs');
const ms = require("ms");
const moment = require('moment')
module.exports = {
    name: 'giveaway', 
    description: 'hosts a giveaways',
    aliases: ['give'],
    cooldown: 15,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        if(!message.content.startsWith(prefix) || message.author.bot) return;
             const args = message.content.slice(prefix.length).split(/ +/);
             const command = args.shift().toLowerCase();
             if (command === 'giveaway') {
        if (!args[0]) return message.channel.send(`You did not specify your time (please specify the time in d-days,h-hours,m-minutes,s-seconds)`);
        if (
          !args[0].endsWith("d") &&
          !args[0].endsWith("h") &&
          !args[0].endsWith("m") &&
          !args[0].endsWith("s")
        )
          return message.channel.send(
            `You did not use the correct formatting for the time!(please specify the time in d-days,h-hours,m-minutes,s-seconds)`
          );
        if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
        const channel = message.mentions.channels.first();
        if (!channel)
          return message.channel.send(
            `I could not find that channel in the guild!`
          );
        let prize = args.slice(3).join(" ");
        if (!prize) return message.channel.send(`No prize specified!`);
        let req = args.slice(2,3).join(" ");
        if (!req) return message.channel.send("Are there any requirements for this Giveaway, if none type nothing")
        message.delete();
        message.channel.send(`*Giveaway created in ${channel}*`);
        const Embed = new Discord.MessageEmbed()
          .setTitle('**<a:kjsc:758210180755750922>New Giveaway<a:kjsc:758210180755750922>** `Please react to 🎉 to Participate!`')
          .addField(`<:pc_present:758212896295092265> Prize:`, `${prize}`)
          .addField(`📝 Giveaway Hosted by:`, ` ${message.author}`)
          .addField(`<a:Timer:744890944557678722> Time:`, `${args[0]}`)
          .addField(`📑 Requirements:`, `Must join: ${req}`)
          .setTimestamp()
          .setFooter("Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
          .setColor(0xFFFF);
        const m = await channel.send(Embed);
        m.react("🎉");
        setTimeout(() => {
          if (m.reactions.cache.get("🎉").count <= 1) {
            message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
            return message.channel.send(
              `**Sufficient** amount of people did not participate in the Giveaway, hence I was unable to determine a <a:medal:744879424628981790>Winner!`
            );
          }
    
          const winner = m.reactions.cache
            .get("🎉")
            .users.cache.filter((u) => !u.bot)
            .random();
          let wembed = new Discord.MessageEmbed()
            .setDescription(`The <a:medal:744879424628981790>Winner of the <a:ff:744878566675841144>Giveaway<a:ff:744878566675841144> for **${prize}** is ||${winner}||! \n 🎊Congrats on winning ${prize}🎊\n Dm ${message.author} to claim your prize <:pc_present:745145491716833303>!`)
            .setTitle(`<a:medal:744879424628981790>Winner`)
            .setFooter("Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
            .setTimestamp()
            .setColor(0xFFFF);
            m.edit(wembed)
            winner.send(`<a:ff:744878566675841144> You won **${prize}** in ${message.guild.name} <a:ff:744878566675841144>\n Dm ${message.author} to claim your prize before the giveaway is rerolled!`)
        }, ms(args[0]));
      }
    }
}