const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'kill', 
    description: 'funny kill message',
    aliases: ['k'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'kill') {
      let gif = ["https://media.giphy.com/media/qgbWNOvZOtwWs/giphy.gif", "https://media.giphy.com/media/AHMHuF12pW4b6/giphy.gif", "https://media.giphy.com/media/x88yuKqdpWbC0/giphy.gif", "https://media.giphy.com/media/w29hHnsoaqsy4/giphy.gif", "https://media.giphy.com/media/A4GmUuQoZrLKE/giphy.gif", "https://media.giphy.com/media/12fFFvFOaffWww/giphy.gif", "https://media.giphy.com/media/xguJD5mJfbeo0/giphy.gif", "https://media.giphy.com/media/hOYwqqDOvWtVu/giphy.gif"]
      let gifa = ["https://media.giphy.com/media/Z9JtPniLKdNzPjsEn6/giphy.gif", "https://media.giphy.com/media/fTn01fiFdTd5pL60ln/giphy.gif", "https://media.giphy.com/media/RLi2oeVZiVkE8/giphy.gif", "https://media.giphy.com/media/uAH7abSiUAlPO/giphy.gif", "https://media.giphy.com/media/Z8kck6EIMQGXK/giphy.gif", "https://media.giphy.com/media/ZT7NnaezicELu/giphy.gif", "https://media.giphy.com/media/O3qU4OEp8RUe4/giphy.gif"]
      let result2 = Math.floor((Math.random() * gif.length));
      let result3 = Math.floor((Math.random() * gifa.length));
      var gifr = gif[result2]
      var gifra = gifa[result3]
    let killed = message.mentions.members.first();
    let kill = message.author
    if(!killed) {
      const sembed = {
        "color": "BLUE",
        "timestamp": new Date(),
        "footer": {"text": "Bot made by Champion2049#3714", "icon_url": 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256'},
        "image": {
          "url": gifr
        },
        "fields": [
          {
            "name": `${kill.displayname} decided to kill themself and died!`,
            "value": "<a:RooPandaCry:758614164641415168> REST IN PEACE 💀",
            "inline": true
          }
        ]
      }
       return message.channel.send({sembed})
    }else if (killed.displayName === kill.username){
      const lembed = {
        "color": "BLUE",
        "timestamp": new Date(),
        "footer": {"text": "Bot made by Champion2049#3714", "icon_url": 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256'},
        "image": {
          "url": gifr
        },
        "fields": [
          {
            "name": `${kill.username} decided to kill themself and died!`,
            "value": "<a:RooPandaCry:758614164641415168> REST IN PEACE 💀",
            "inline": true
          }
        ]
      }
        return message.channel.send({lembed})
    }else{
      const embed = {
        "color": "BLUE",
        "timestamp": new Date(),
        "footer": {"text": "Bot made by Champion2049#3714", "icon_url": 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256'},
        "image": {
          "url": gifra
        },
        "fields": [
          {
            "name": `${killed.displayName} was killed by ${message.author.username}! Ouch....`,
            "value": "<a:fireduck:758214180918132776> REST IN PEACE 💀",
            "inline": true
          }
        ]
      }
      return message.channel.send({embed})
    };
  }
    }
}
