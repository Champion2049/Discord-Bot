const Discord = require('discord.js');
const db = require('quick.db')
const got = require('got');
module.exports = {
    name: 'dankmeme', 
    description: 'dank memes',
    aliases: ['dank'],
    cooldown: 5,
    execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'dankmeme') {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setColor("BLUE")
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments} || Bot made by Champion2049#3714`, `https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256`);
        message.channel.send(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
}
    }
}