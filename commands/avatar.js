const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'avatar', 
    description: 'displays the users avatar',
    aliases: ['a'],
    cooldown: 3,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
        const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if (command === 'avatar') {
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
          } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
          } else {
            user = message.author;
          }
          
          let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
          const embed = new Discord.MessageEmbed()
          .setTitle(`${user.tag}'s Avatar`)
          .setDescription(`[Download Avatar of **${user.tag}**](${avatar})`)
          .setColor(0x1d1d1d)
          .setImage(avatar)
          .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
          .setColor("BLUE");
          return message.channel.send(embed);
          }
        }
}