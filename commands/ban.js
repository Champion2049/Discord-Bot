const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'ban', 
    description: 'bans user',
    aliases: ['b'],
    cooldown: 30,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
if(!message.content.startsWith(prefix) || message.author.bot) return;
     const args = message.content.slice(prefix.length).split(/ +/);
     const command = args.shift().toLowerCase();
if (!message.guild) return;
if (command === 'ban') {
  const user = message.mentions.users.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      member
        .ban({
          reason: 'They were bad!',
        })
        .then(() => {
          message.reply(`Successfully banned ${user.tag}\nhttps://tenor.com/view/trump-donaldtrump-interview-banned-cnn-gif-7677105`);
        })
        .catch(err => {
          message.reply('I was unable to ban the member');
          console.error(err);
        });
    } else {
      message.reply("That user isn't in this guild!");
    }
  } else {
    message.reply("You didn't mention the user to ban!");
  }
}
    }
}