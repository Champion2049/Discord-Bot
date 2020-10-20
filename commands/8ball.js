const Discord = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: '8ball', 
    description: 'random answer is given',
    aliases: ['8'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
         if(command === '8ball'){
    if(!args[1]) return message.reply("Please enter a full question with 2 or more words!");
    let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cya", "I am not sure!", "Please No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("BLUE")
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
    message.channel.send(embed)
    message.delete();
         }
    }
}