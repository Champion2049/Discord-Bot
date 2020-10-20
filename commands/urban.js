const Discord = require('discord.js');
const db = require('quick.db')
const urban = require("urban");
module.exports = {
    name: 'urban', 
    description: 'searches the urban dictionary for the entered word',
    aliases: ['u'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'urban'){
    if(args.length < 1) return message.reply("Please enter something!");
    let XD = args.join(" "); 
    urban(XD).first(json => {
        if(!json) return message.reply("No results found!")
        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by: ${json.author} || Bot made by Champion2049#3714`, 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256');
        message.channel.send(embed)
        message.delete();
    });
  }
    }
}