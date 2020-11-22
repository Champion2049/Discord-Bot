const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'fortniteshop', 
    description: 'displays fortnite item shop',
    aliases: ['f'],
    cooldown: 5,
    async execute(message){
        const prefix = db1.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
if (command === 'fortniteshop') {
const canvas = require("discord-canvas"),
   shop = new canvas.FortniteShop();
   const msg = await message.channel.send("Fetching the shop...")
const image = await shop
  .setToken("185bdd76-87b9-41ad-9d55-b86599679d29")
  .toAttachment();
const attachment = new Discord.MessageAttachment(image, "FortniteShop.png");
message.channel.send(attachment) && msg.delete()
}
    }
}