const Discord = require('discord.js');
const db = require('quick.db')
const Zoro = require("zoro-api");
module.exports = {
    name: 'ps4', 
    description: 'ps4',
    aliases: ['ps'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'ps4') {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true }).replace(".webp", ".png")
        const msg = await message.channel.send("Generating...")
        const img = await Zoro.ps4(avatar)
        const attachment = new Discord.MessageAttachment(img, "ps4.png");
        message.channel.send(attachment) && msg.delete();
    }
    }
}