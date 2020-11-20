const Discord = require('discord.js');
const db = require('quick.db')
const Zoro = require("zoro-api");
module.exports = {
    name: 'jail', 
    description: 'jail avatar',
    aliases: ['j'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'jail') {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true }).replace(".webp", ".png")
        const msg = await message.channel.send("Generating...")
        const img = await Zoro.jail(avatar)
        const attachment = new Discord.MessageAttachment(img, "jail.png");
        message.channel.send(attachment) && msg.delete();
    }
    }
}