const Discord = require('discord.js');
const db = require('quick.db')
const Zoro = require("zoro-api");
module.exports = {
    name: 'convolute', 
    description: 'convoluted avatar',
    aliases: ['conv'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'convolute') {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true }).replace(".webp", ".png")
        const msg = await message.channel.send("Convoluting...")
        const img = await Zoro.convolute(avatar)
        const attachment = new Discord.MessageAttachment(img, "convolute.png");
        message.channel.send(attachment) && msg.delete();
    }
    }
}