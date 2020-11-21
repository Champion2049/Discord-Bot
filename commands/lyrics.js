const Discord = require('discord.js');
const db = require('quick.db')
const Genius = require("genius-lyrics");
const genius = new Genius.Client("aZonE2yyifqJ8uq_LVobvdKT5ZZbpg4Xux22-Bbt5yvVsaxcPPW2zy9bpI26vqjq");
module.exports = {
    name: 'lyrics', 
    description: 'gives the bot ping',
    aliases: ['l'],
    cooldown: 5,
    async execute(message){
        const prefix = db1.get(`guild_${message.guild.id}_prefix`) || "dc"
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
if (command === 'lyrics') {
  if(!args[0]) return message.channel.send("Please enter a song name!")
  const searches = await genius.songs.search(args[0]).catch(err => message.channel.send(err))
    const song = searches[0]
    const lyrics = await song.lyrics()
    const embed = new Discord.MessageEmbed()
    .setDescription(`${lyrics.substring(0, 2043)}.....`)
    .setTitle(`**${song.title}** by **${song.artist.name}**`)
    .setURL(song.url)
    .setColor("BLUE")
    .setFooter("Bot made by Champion2049#3714 || Lyrics powered by Genius Lyrics","https://images-ext-2.discordapp.net/external/3Vzt9TC-qNbog5byWTTbQXKI1VEAUDhsBa20AQtt8Rc/https/images-ext-2.discordapp.net/external/QfXXsBa5_d1G4ZQ__4IdA0mi1nYorI9EHL2f0H2hnkc/%253Fsize%253D4096/https/cdn.discordapp.com/avatars/730644349897015307/a0048cb10064dd3adb06dc1c3c0abc98.webp?width=600&height=600")
    .setThumbnail("https://images-ext-1.discordapp.net/external/4v6OiuGi2cBT0B77XJOJl0ghFEMaUNTi6MUY1APEQ9A/%3F1605635080/http/assets.genius.com/images/sharing_fallback.png?width=600&height=600")
    message.channel.send(embed)
}
    }
    }