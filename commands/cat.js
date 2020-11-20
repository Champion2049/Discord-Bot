const Discord = require('discord.js');
const db = require('quick.db')
const Zoro = require("zoro-api");
module.exports = {
    name: 'cat', 
    description: 'cat',
    aliases: ['ca'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'cat') {
        const user = message.mentions.users.first() || message.author;
        const msg = await message.channel.send("Getting Cat Image...")
        const img = await Zoro.cat()
        const attachment = new Discord.MessageAttachment(img, "cat.png");
        message.channel.send(attachment) && msg.delete();
    }
    }
}