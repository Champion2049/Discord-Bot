const Discord = require('discord.js');
const db = require('quick.db')
const canvas = require("discord-canvas"),
stat = new canvas.FortniteStats();
module.exports = {
    name: 'fortnite', 
    description: 'fortnite stats',
    aliases: ['fort'],
    cooldown: 5,
    async execute(message){
        const prefix = db1.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  if (command === 'fortnite') {
    if(!args[0]) return message.channel.send("Please enter your fortnite username!")
    if(!args[1]) return message.channel.send("Please enter the platform you play on(ex:psn,xbl or pc)!")
const user = args[0],
  platform = args[1];
const image = await stat
  .setToken("795afe47-6cdf-49ce-9ed2-753c88d80c8b")
  .setUser(user)
  .setPlatform(platform)
  .toAttachment();
if (platform !== "pc" && platform !== "xbl" && platform !== "psn") return message.channel.send("Please enter a valid platform")
if (!image) return message.channel.send("User not found")
const attachment = new Discord.MessageAttachment(image.toBuffer(), "FortniteStats.png");
message.channel.send(attachment);
  }
    }
}