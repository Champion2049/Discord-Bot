const Discord = require('discord.js');
const db = require('quick.db')
const badwordlist = require("./badword.json")
const giphy = require('giphy-api')("9O0XEVL8AnPAKSEp8xE9vlO3Al8OX6QT");
module.exports = {
    name: 'gif', 
    description: 'searches giphy for a gif',
    aliases: ['g'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        if (badwordlist.some((word) => message.content.toLowerCase().includes(word))) return message.channel.send("Please do not request for inapropriate content!")
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'gif'){
  if (args.length === 0) {
    message.channel.send('No Search terms!')
    return;
  }
  if (args.length === 1) {
    term = args.toString()
  } else {
    term = args.join(" ");
  }
  giphy.search(term).then(function (res) {
    let id = res.data[0].id
    let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`
    const embed = {
      "color": 3066993,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "https://raw.githubusercontent.com/Giphy/GiphyAPI/f68a8f1663f29dd9e8e4ea728421eb2977e42d83/api_giphy_logo_sparkle_clear.gif",
        "text": `Gif requested by ${message.author.username} | Powered by Giphy`
      },
      "image": {
        "url": msgurl
      },
      "fields": [
        {
          "name": `Search Term`,
          "value": "`" + term + "`",
          "inline": true
        },
        {
          "name": "Page URL",
          "value": "[Giphy](" + res.data[0].url + ")",
          "inline": true
        }
      ]
    };
    message.channel.send({ embed });
    message.delete();
    if(!id) return message.channel.send("No search results found!")
  })
    }
    }
}