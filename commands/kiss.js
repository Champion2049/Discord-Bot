const Discord = require('discord.js');
const db = require('quick.db')
const Zoro = require("zoro-api");
const { hug } = require('zoro-api/src/module/DIG');
module.exports = {
    name: 'kiss', 
    description: 'kiss gif',
    aliases: ['ki'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'kiss') {
        const user = message.mentions.users.first();
        if(!message.mentions.users.first()) return message.channel.send("Please mention someone to kiss!")
        const image = await Zoro.kiss()
        const embed = {
            "color": "BLUE",
        "timestamp": new Date(),
        "footer": {"text": "Bot made by Champion2049#3714", "icon_url": 'https://images-ext-2.discordapp.net/external/3Vzt9TC-qNbog5byWTTbQXKI1VEAUDhsBa20AQtt8Rc/https/images-ext-2.discordapp.net/external/QfXXsBa5_d1G4ZQ__4IdA0mi1nYorI9EHL2f0H2hnkc/%253Fsize%253D4096/https/cdn.discordapp.com/avatars/730644349897015307/a0048cb10064dd3adb06dc1c3c0abc98.webp?width=600&height=600'},
        "image": {
          "url": image
        },
        "fields": [
          {
            "name": `${message.author.username} kisses ${user.username}`,
            "value": `😳`,
            "inline": true
          }
        ]
      }
        message.channel.send({ embed })
    }
}
    }