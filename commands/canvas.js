const Discord = require('discord.js');
const db = require('quick.db')
const Canvas = require("canvas")
module.exports = {
    name: 'canvas', 
    description: 'trying canvas',
    aliases: ['can'],
    cooldown: 5,
    async execute(message){
        const canvas = Canvas.createCanvas(700,250);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./bg.jpg')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
        const avatar = await Canvas.loadImage(message.author.avatarURL({format: "jpg"}))
        ctx.drawImage(avatar, 25, 25, 200, 200)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'canvas.png')
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  if (command === 'canvas') {
      message.channel.send(attachment)
  }
    }
}