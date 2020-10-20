const Discord = require('discord.js');
const db = require('quick.db')
const imdb = require("imdb-api");
module.exports = {
    name: 'tv', 
    description: 'searches imdb',
    aliases: ['t'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'tv') {
    if(!args.length) {
      return message.channel.send("Please give the name of the movie or anime/tv series")
    }
    const imob = new imdb.Client({apiKey: "5e36f0db"}) 
    let movie = await imob.get({'name': args.join(" ")})
    let embed = new Discord.MessageEmbed()
    .setTitle(movie.title)
    .setColor("#ff2050")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Ratings: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true)
    .addField("Main Actors", movie.actors, true)
    .addField("Release Date", movie.released, true)
    .addField("Ratings", `${movie.rating}/10`, true)
    .addField("Director", movie.director, true)
    .addField("Score", movie.metascore, true)
    .addField("Awards Received", movie.awards, true)
    .addField("Genres", movie.genres, true)
    .setFooter("Powered by IMDb || Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256');
    message.channel.send(embed)
  }
    }
}