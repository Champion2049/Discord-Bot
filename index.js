const Discord = require('discord.js');
const client = new Discord.Client(); 
const prefix = 'dc';
var version = '3.1';
var servers = {};
const covid = require('novelcovid')
const ytdl = require("ytdl-core");
const fs = require('fs');
const { ALL } = require('dns');
const { title } = require('process');
const YOUTUBE_API = "AIzaSyCSKVPpO4Ke-FIDFR9HnWeQ2TvKtuVz9yE"
const queue = new Map()
const moment = require('moment')
const db = require('mongoose')
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log('Easy Use Bot is online!' + version);
    const botuptime = client.uptime
    function randomStatus() {
        let status = [`${client.guilds.cache.size} servers!`, `${client.channels.cache.size} channels!`, `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users!`, ` ${prefix}help || Version: ${version}`]
        let rstatus = Math.floor(Math.random() * status.length);
        let types = ["WATCHING"]
        let rtypes = Math.floor(Math.random() * types.length);
        client.user.setActivity(status[rstatus], {type: types[rtypes], url: "https://facebook.com/lapizherda"});
        }; setInterval(randomStatus, 5000) 
        await db.connect('mongodb+srv://Champion2049:anaconda6@cluster0.lp7ib.mongodb.net/Champion2049?retryWrites=true&w=majority', dbOptions)
        .then(console.log("Mongodb"))
});
client.on('message', message =>{
       if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();

       if(command === 'ping'){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var embed = new Discord.MessageEmbed()
            .setAuthor(`The Bot's current ping is ${ping}ms`)
            .setColor("GREEN")
            m.edit(embed)
        });
    }
       }
);
client.on('message', message => {
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
});

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
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
  .setFooter('Bot made by Champion2049#3714');
  
  return message.channel.send(embed);
  }
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'poll') {
    if (!args) return message.reply("You must have something to vote for!")
    if (!message.content.includes("?")) return message.reply("Please include a ? in your vote!")
    let msgArgs = args.slice(1).join("");
    const embed = new Discord.MessageEmbed()
   .setTitle(message.content.slice(6))
   .setFooter('Bot made by Champion2049#3714', 'https://imgur.com/a/H2wrrI6')
   .setColor(0x14C9ED)
   .setDescription('React with ✅ if you **agree** and to ❌ if you **disagree**')
   .setAuthor(`🗳 ${message.author.username} started a poll! 🗳`)
   message.channel.send(embed).then(messageReaction => {
   messageReaction.react('✅');
   messageReaction.react('❌');
   message.delete();
  })
}
})
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.on('message', message => {
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
   if (command === 'prefix') {
		message.reply(`you can either ping me or use \`${prefix}\` as my prefix.`);
	}
});
client.on('message', async message => {
  let args = message.content.substring(prefix.length).split(" "); 
  switch (args[0]){
    case 'play2':
      function play(connection, message){
        var server = servers[message.guild.id];
        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on("finish", () =>{
          if(server.queue[0]){
              play(connection, message);
          }else{
              connection.disconnect();
          }
          });
      }
      let validate = ytdl.validateURL(args[1]);
      if (!validate){
        return message.reply("Please provide a valid URL");  
      }
      if(!message.member.voice.channel){
       return message.reply('Please join a voice channel first');
      }
      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }
      var server = servers[message.guild.id];
      server.queue.push(args[1]);
      if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
        play(connection, message);
        return;
      })
      break;
  }
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'botinfo') {
    let inline = true
    let bicon = client.user.displayAvatarURL;
    let usersize = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    let chansize = client.channels
    let uptimxd = client.uptime 
    let servsize = client.guilds.cache.size
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let botembed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setThumbnail(`https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256`)
    .addField("Bot Name", `<a:nitroboost:744884824015110204>${client.user.username}<a:nitroboost:744884824015110204>`, inline)
    .addField("Bot Owner", "<a:crown:744885017511198791> Champion2049#3714" , inline )
    .addField("Bot ID", '<:005idcard:744890183782236201>  730644349897015307')
    .addField("Servers", `<:Discord:744889665164804157> ${servsize}`, inline)
    .addField("Users", `<a:dc:744888395041341460>${usersize}`, inline)
    .addField("Bot Library", "<:Visual_Studio_Code:744887180849053696> Discord.js", inline)
    .addField("Created On",`<a:UnderConstruction:744891721854222367>${client.user.createdAt}`)
    .addField("Bot Version", `<:version:744891034152075345>${version}`)
    .addField("Uptime", `<a:Timer:744890944557678722>${days}d ${hours}h ${minutes}m ${seconds}s`)
    .setTitle(`Click here to Invite the bot!`)
    .setURL('https://discordapp.com/oauth2/authorize?client_id=730644349897015307&scope=bot&permissions=2146958847')
    .setFooter(`Information about: ${client.user.username}. Developed by: Champion2049`, 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
    .setTimestamp()
    
    message.channel.send(botembed);
}
})
const urban = require("urban");
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'urban'){
    if(args.length < 1) return message.reply("Please enter something!");
    let XD = args.join(" "); 

    urban(XD).first(json => {
        if(!json) return message.reply("No results found!")

        const embed = new Discord.MessageEmbed()
        .setColor("00ff00")
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by: ${json.author}`);
        message.channel.send(embed)
        message.delete();
    });
  }
})
  client.on('message', async message => {
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
    .setColor("#00ff00")
    .addField("Question", question)
    .addField("Answer", replies[result])
    message.channel.send(embed)
    message.delete();
         }
  })
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'clear'){
if(args[0] == "clear"){
  let helpembxd = new Discord.MessageEmbed()
  .setColor("#00ff00")
  .addField(`clear Command", "Usage: ${prefix}clear <amount>`)
  message.channel.send(helpembxd);
  return;
} 
message.delete()
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premssions to do that!");
if(!args[0]) return message.channel.send('Please enter a number of messages to clear! `Usage: dcclear <amount>`');
message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(`**__Cleared ${args[0]} messages.__**`).then(msg => msg.delete({ timeout: 3000 }));
})
       }
});
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'warn'){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');
  if (reason.length < 1) return message.reply('You must have a reason for the warning.');
  let dmsEmbed = new Discord.MessageEmbed()
  .setTitle("Warn")
  .setColor("#00ff00")
  .setDescription(`You have been warned on \`${message.guild.name}\``)
  .addField("Warned by", message.author.tag)
  .addField("Reason", reason);
  user.send(dmsEmbed);
  message.delete();
  message.channel.send(`${user.tag} has been warned`)
}
})
const giphy = require('giphy-api')("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");
client.on('message', async message => {
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
        "text": "Powered by Giphy"
      },
      "image": {
        "url": msgurl
      },
      "fields": [
        {
          "name": "Search Term",
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
  })
    }
  })
      client.on('message', async message => {
        if(!message.content.startsWith(prefix) || message.author.bot) return;
             const args = message.content.slice(prefix.length).split(/ +/);
             const command = args.shift().toLowerCase();
             if(command === 'google'){
          if(args.length < 1) message.channel.send('I need to know what to search...');
          message.channel.send('\nhttps://google.com/search?q='+args)
      }
    })
  /*const createCaptcha = require('./captcha.js');
  client.on('guildMemberAdd', async member => {
      const captcha = await createCaptcha();
      try {
          const msg = await member.send('You have to verify yourself to get the Verified Role', {
              files: [{
                  attachment: `${__dirname}/captchas/${captcha}.png`,
                  name: `${captcha}.png`
              }]
          });
          const role = member.guild.roles.cache.find(role => role.name === 'Verfied')
              if(!role){
                member.guild.roles.create({ data: { name: 'Verfied', permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"] } });
              }
          try {
              const filter = m => {
                  if(m.author.bot) return;
                  if(m.author.id === member.id && m.content === captcha) return true;
                  else {
                      m.channel.send('You entered the captcha incorrectly.');
                      return false;
                  }
              };
              const response = await msg.channel.awaitMessages(filter, { max: 1, time: 200000, errors: ['time']});
              if(response) {
                  await msg.channel.send('You have verified yourself!')
                  await member.roles.add(role)
                      .catch(err => console.log(err));
              }
          }
          catch(err) {
              console.log(err);
              await msg.channel.send('You did not solve the captcha correctly on time.');
              await member.roles.remove(role)
                      .catch(err => console.log(err));
          }
      }
      catch(err) {
          console.log(err);
      }
  });*/
  client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'help') {
      const embed = new Discord.MessageEmbed()
      .setTitle('**Help is Here!**')
      .setColor(0x14c9ed)
      .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
      .addField('<a:modo:758209576029257738>__Moderation Commands__<a:modo:758209576029257738>', 'Commands which require Admin Permission')
      .addField('<a:MusicDance:745128069869862922>__Music Commands__<a:BearMusic:745122983751843910>', 'Commands that are related to Music')
      .addField('<a:kjsc:758210180755750922>__Giveaway Commands__<a:ck_partypack:745123439664169102>', `Commands that are related to Giveaways`)
      .addField('🤪__Fun Commands__<a:BearLaugh:745125674360111145>', "Commands to solve your Boredom issues")
      //.addField('📝__Captcha (inbuilt)__<:Protection:745124390601228358>', 'Protection against Raiders')
      .addField('<:botverificado:745124688048554054>__Extra Commands__<:botverificado:745124688048554054>', "More Information")
      .setTimestamp()
      const m = await message.channel.send(embed)
      m.react("🛠")
      m.react("🎵")
      m.react("🎉")
      m.react("🤪")
      //m.react("📝")
      m.react("🤖")
      m.react("❌")
      m.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name === '🛠' || reaction.emoji.name === '🎵' || reaction.emoji.name === '🎉' || reaction.emoji.name === '🤪' /*|| reaction.emoji.name === '📝' */|| reaction.emoji.name === '🤖' || reaction.emoji.name === '❌'),
                          {max: 100, time: 1000 }).then(collected => {
                                  if (collected.first().emoji.name === '🛠') {
                                          const membed = new Discord.MessageEmbed()
                                          .setTitle('<a:modo:758209576029257738> **__Moderation Commands__** <a:modo:758209576029257738>')
                                          .setFooter("Bot made by Champion2049#3714")
                                          .setDescription('**dckick**- kicks the mentioned person\n **dcban**- bans the mentioned person\n **dcclear**- deletes a mentioned amount of messages\n **dcpoll**- creates a poll to vote on\n **dcwarn**- gives the mentioned user a warning\n **dcserverinfo**- gives detailed information about the server\n **dcmute**- mutes the mentioned person for the given amount of time\n **dcaddrole**- adds the mentioned role to the mentioned user\n **dcremoverole**- removes a mentioned role from the mentioned user\n **dcset_welcome_channel**- sets a channel where a Welcome message will be sent whenever a new member joins')
                                          .setColor(0x14c9ed)
                                          m.edit(membed)
                                          m.reactions.removeAll()
                                  }
                                  else if(collected.first().emoji.name === '🎵'){
                                    const muembed = new Discord.MessageEmbed()
                                    .setTitle('**<a:MusicDance:745128069869862922>__Music Commands__<a:BearMusic:745122983751843910>**')
                                    .setFooter("Bot Made by Champion2049#3714")
                                    .setDescription('**dcplay**- plays music from provided link\n**dcstop**- stops playing music and leaves the voice channel\n**dcpause**- pauses the music that is playing\n**dcresume**- resumes the paused music\n**dcqueue**- shows the currents song queue\n**dcskip**- skips the song\n**dcvolume**- shows the current volume and if volume value is written after it changes volume to that\n**dcnp**- shows the song that is currently playing\n**dcloop**- loops the queued music(if already looped enter again to exit from loop)')
                                    .setColor(0x14c9ed)
                                    m.edit(muembed)
                                    m.reactions.removeAll()                                 
                                  }
                                  else if(collected.first().emoji.name === '🎉'){
                                    const gembed = new Discord.MessageEmbed()
                                    .setTitle('**<a:kjsc:758210180755750922>__Giveaway Commands__<a:ck_partypack:745123439664169102>**')
                                    .setFooter('Bot made by Champion2049#3714')
                                    .setDescription(`**dcgiveaway**- holds a giveaway, usage: dcgiveaway <time> <channel name> <requirements(if any)> <prize>\n More coming soon`)
                                    .setColor(0x14c9ed)
                                    m.edit(gembed)
                                    m.reactions.removeAll()
                                  }
                                  else if(collected.first().emoji.name === '🤪'){
                                    const fembed = new Discord.MessageEmbed()
                                    .setTitle('**<a:BearLaugh:745125674360111145>__Fun Commands__<:HAHAHA:745129345999175730>**')
                                    .setFooter("Bot made by Champion2049#3714")
                                    .setDescription("**dcgif**- searches giphy for the mentioned word(s)\n **dc8ball**- ask a question and it will answer it\n **dcgoogle**- googles the mentioned word(s)\n **dcyoutube**- searches the word(s) on youtube\n **dcurban**- searches the urban dictionary for the mentioned word(s)\n **dcavatar**- shows your or mentioned user's profile picture\n **dckill**- sends a funny message of how the person/ mentioned person died/ was killed\n **dctv**- searches the mentioned word(s) on imdb(movies,series,anime) and gives you the result\n **dcmeme**- gives you a meme from reddit\n **dcping**- shows you the bot's ping\n **dcinvites**- check how many invites you have in the current server")
                                    .setColor(0x14c9ed)
                                    m.edit(fembed)
                                    m.reactions.removeAll()
                                  }
                                  /*else if(collected.first().emoji.name === '📝'){
                                    const cembed = new Discord.MessageEmbed()
                                    .setTitle('**📝__Captcha (inbuilt)__<:Protection:745124390601228358>**')
                                    .setFooter("Bot made by Champion2049#3714")
                                    .setDescription('It makes all newly joined members solve a captcha within a specified time!\n This feature prevents your server from raids!\n Will be adding ``enable and disable captcha command coming soon``!')
                                    .setColor(0x14c9ed)
                                    m.edit(cembed)
                                    m.reactions.removeAll()
                                  }*/
                                  else if(collected.first().emoji.name === '🤖'){
                                    const bembed = new Discord.MessageEmbed()
                                    .setTitle('**<:botverificado:745124688048554054>__Extra Commands__<:botverificado:745124688048554054>**')
                                    .setFooter("Bot made by Champion2049#3714")
                                    .setDescription("**dcbotinfo**- see information about the bot\n**dcinvite**- get the link to invite the bot!\n**dcsupport**- gives you the link to the bot's support server\n **dchelp**- displays the current page containing all the bot's commands\n**dcuserinfo**- gives information about yourself or mentioned user\n**dccovid**- gives COVID19 stats")
                                    .setColor(0x14c9ed)
                                    m.edit(bembed)
                                    m.reactions.removeAll()
                                  }
                                  else if(collected.first().emoji.name === '❌'){
                                    m.edit('Closed').then(msg => msg.delete({timeout: 2000}));
                                  }
                                  else
                                          message.reply('Operation canceled.');
                          })
      message.delete();
    }
  })
  client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'invite') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Invite the bot by clicking here!')
      .setURL('https://discord.com/oauth2/authorize?client_id=730644349897015307&scope=bot&permissions=2146958847')
      .addField(`Invite the bot from AYB`, `https://ayblisting.com/bots/730644349897015307`)
      .addField(`Invite the bot from Discord Bot List`, `https://discord.ly/easy-use-bot`)
      .addField(`Invite the bot from Bots for Discord`, `https://botsfordiscord.com/bot/730644349897015307`)
      .addField(`Invite the bot from Aspect Bot List`, `https://sudden-tidal-phalange.glitch.me/bots/730644349897015307`)
      .setColor("GOLD")
      message.channel.send(embed)
    }
  }) 
  client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
    if (command === 'kill') {
      let replies = ["by slipping over a leaf", "by using a gun", "I don't know how he died", "by jumping in a well", " by hanging himself to death", "because he was bored", "by watching too much tv", "go ask him how", "by falling from his bed", "by crying too much", "I wonder why" ];
      let repliesa = ["for laughing too much", "for not using the bot", "by drowning him in a swimming pool", "by stabbing him in the chest", "because he farted too much", "with his sniper", "by running him over by a car", "by feeding him to his pet lion", "because he was not worthy of living"];
      let gif = ["https://tenor.com/view/anime-sleeping-im-dead-gif-15157935", "https://tenor.com/view/lol-sherlock-death-dead-dying-gif-5196637", "https://tenor.com/view/dead-anime-death-soulless-gif-11385161", "https://tenor.com/view/mati-bodoh-bangang-keranda-menari-gif-16794417", "https://tenor.com/view/imout-bye-gif-4989183", "https://tenor.com/view/finger-gun-barney-himym-nph-neil-patrick-harris-gif-4524247", "https://giphy.com/gifs/season-13-the-simpsons-13x14-l2JeiuwmhZlkrVOkU", "https://giphy.com/gifs/gta-wasted-gta5-AHMHuF12pW4b6"]
      let gifa = ["https://giphy.com/gifs/zenitsu-fTn01fiFdTd5pL60ln", "https://giphy.com/gifs/zenitsu-Z9JtPniLKdNzPjsEn6", "https://giphy.com/gifs/wasted-RLi2oeVZiVkE8"]
      let result = Math.floor((Math.random() * replies.length));
      let result1 = Math.floor((Math.random() * repliesa.length));
      let result2 = Math.floor((Math.random() * gif.length));
      let result3 = Math.floor((Math.random() * gifa.length));
    let killed = message.mentions.members.first();
    if(!killed) {
      let sembed = new Discord.MessageEmbed()
      message.channel.send(`${message.author.username} decied to kill themself and died, ${replies[result]}! <a:RooPandaCry:758614164641415168> REST IN PEACE 💀`)
    message.channel.send(`${gif[result2]}`)
    } else {
    message.channel.send(`${killed.username} was killed by ${message.author.username}! Ouch....  <a:fireduck:758214180918132776> REST IN PEACE 💀`)
    message.channel.send(`${gifa[result3]}`)
    }
  }
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'serverinfo') {
  function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
  }
  
  const verifLevels = ["None", "Low", "Medium", "High", "Highest"];
const embed = new Discord.MessageEmbed()
.setTitle("**Server Information**")
.addField("Name", `<:Discord:744889665164804157> ${message.guild.name}`, true)
.addField("ID", `<:005idcard:744890183782236201> ${message.guild.id}`, true)
.addField("Owner", `<a:crown:744885017511198791> ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Region", `🏘 ${message.guild.region}`, true)
.addField("Total | Humans | Bots", `<a:dc:744888395041341460> ${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
.addField("Verification Level", `<a:lcgreen:745884544309133352> ${message.guild.verificationLevel}`, true)
.addField("Channels", `<:version:744891034152075345> ${message.guild.channels.cache.size}`, true)
.addField("Roles", `📋 ${message.guild.roles.cache.size}`, true)
.addField("Emoji Count", `<a:nitroboost:744884824015110204> This server has ${message.guild.emojis.cache.size} emojis <a:nitroboost:744884824015110204>`)
.addField("Creation Date", `<a:Timer:744890944557678722> ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
.addField("You Joined the server on", `<a:chahal_welcome:758211451046723585> ${message.member.joinedAt}`)
.setColor("#00ff00")
.setFooter(`Information about: ${message.guild.name} provided by Easy Use Bot\n Bot made by Champion2049#3714`)
.setThumbnail(message.guild.iconURL)
message.channel.send({embed});
}
})
const imdb = require("imdb-api");
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'tv') {
module.exports = {
name: "imdb",
  description: "Get the information about series and movie",
  category: "info",
  usage: "imdb <name>",
  run: async (client, message, args, color) => {

}
    }
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
    .setFooter("Powered by IMDb\n Bot made by Champion2049#3714");
    message.channel.send(embed)
  }
})
const got = require('got');
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'meme') {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
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
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        message.channel.send(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
}
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'support') {
    const embed = new Discord.MessageEmbed()
    .setTitle("Join our support server!")
    .setURL('https://discord.gg/yeuS2WH')
    .setDescription('Join our support server if you need any more assistance')
    .setColor("BLUE")
    message.channel.send(embed);
  }
})
const ms = require("ms");
const {timeStamp} = require('console');
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if (command === 'mute') {
  const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
  let removerole = message.guild.roles.cache.find(removerole => removerole.name === "Member")
  if(!muterole){
      message.guild.roles.create({ data: { name: 'Muted', permissions: 0,reason: 'Muted role not present in server!' } }); 
    }
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.roles.add(muterole)) 
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.roles.remove(muterole);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
}
})
module.exports = {
  name: "giveaway",
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "fun"
}
  client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
         const args = message.content.slice(prefix.length).split(/ +/);
         const command = args.shift().toLowerCase();
         if (command === 'giveaway') {
    if (!args[0]) return message.channel.send(`You did not specify your time (please specify the time in d-days,h-hours,m-minutes,s-seconds)`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m") &&
      !args[0].endsWith("s")
    )
      return message.channel.send(
        `You did not use the correct formatting for the time!(please specify the time in d-days,h-hours,m-minutes,s-seconds)`
      );
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
    const channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `I could not find that channel in the guild!`
      );
    let prize = args.slice(3).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);
    let req = args.slice(2,3).join(" ");
    if (!req) return message.channel.send("Are there any requirements for this Giveaway, if none type nothing")
    message.delete();
    message.channel.send(`*Giveaway created in ${channel}*`);
    const Embed = new Discord.MessageEmbed()
      .setTitle('**<a:kjsc:758210180755750922>New Giveaway<a:kjsc:758210180755750922>** `Please react to 🎉 to Participate!`')
      .addField(`<:pc_present:758212896295092265> Prize:`, `${prize}`)
      .addField(`📝 Giveaway Hosted by:`, ` ${message.author}`)
      .addField(`<a:Timer:744890944557678722> Time:`, `${args[0]}`)
      .addField(`📑 Requirements:`, `Must join: ${req}`)
      .setTimestamp()
      .setFooter("Bot made by Champion2049#3714")
      .setColor(0xFFFF);
    const m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `**Sufficient** amount of people did not participate in the Giveaway, hence I was unable to determine a <a:medal:744879424628981790>Winner!`
        );
      }

      const winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      let wembed = new Discord.MessageEmbed()
        .setDescription(`The <a:medal:744879424628981790>Winner of the <a:ff:744878566675841144>Giveaway<a:ff:744878566675841144> for **${prize}** is ||${winner}||! \n 🎊Congrats on winning ${prize}🎊\n Dm ${message.author} to claim your prize <:pc_present:745145491716833303>!`)
        .setTitle(`<a:medal:744879424628981790>Winner`)
        .setFooter("Bot made by Champion2049#3714")
        .setTimestamp()
        .setColor(0xFFFF);
        m.edit(wembed)
        winner.send(`<a:ff:744878566675841144> You won **${prize}** in ${message.guild.name} <a:ff:744878566675841144>\n Dm ${message.author} to claim your prize before the giveaway is rerolled!`)
    }, ms(args[0]));
  }
})
const YouTube = require("discord-youtube-api");
const { userInfo } = require('os');
const youtube = new YouTube("AIzaSyB_-z54JR-_BSQUg2JdF4CpQ9KYu9UkYws");
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       if(command === 'youtube'){
        if(args.length < 1) message.channel.send('I need to know what to search...');
        const video = await youtube.searchVideos(args);
        message.channel.send(`https://www.youtube.com/watch?v=${video.id}`);
        console.log(video);
       }
})
require('dotenv').config()
client.on('message', async message =>{
  if(message.author.bot) return
  if(!message.content.startsWith(prefix)) return
  const args = message.content.substring(prefix.length).split(" ");
  const serverQueue = queue.get(message.guild.id)
  if(message.content.startsWith(`${prefix}play`)){
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.reply("Please join a Voice Channel first!")
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has("CONNECT")) return message.reply('I dont have the required permissions to join a Voice Channel!')
    if(!permissions.has("SPEAK")) return message.reply('I dont have the permission to speak in the Voice Channel!')
    const songInfo = await ytdl.getInfo(args[1])
    const song = {
      title: Discord.Util.escapeMarkdown(songInfo.videoDetails.title),
      url: songInfo.videoDetails.video_url
    }
    if(!serverQueue){
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null, 
        songs: [],
        volume: 5, 
        playing: true,
        loop: false
      }
      queue.set(message.guild.id, queueConstruct)
      queueConstruct.songs.push(song)
    try{
      var connection = await voiceChannel.join()
      queueConstruct.connection = connection
      play(message.guild, queueConstruct.songs[0])
    }catch(error){
    console.log(`There was an error in connecting to the Voice Channel: ${error}`)
    queue.delete(message.guild.id)
    return message.reply(`There was an error in connecting to the Voice Channel: ${error}`)
    }
    let validate = ytdl.validateURL(args[1]);
      if (!validate){
        return message.reply("Please provide a valid URL");  
      }
    }else{
        serverQueue.songs.push(song)
        return message.channel.send(`**${song.title}** has been added to the queue! `)
      }
      function play(guild, song){
        const serverQueue = queue.get(guild.id)
        if(!song){
          serverQueue.voiceChannel.leave()
          queue.delete(guild.id)
          return
      } 
        const dispatcher = connection.play(ytdl(args[1]))
        .on('finish', () => {
          if(!serverQueue.loop) {serverQueue.songs.shift()}
          play(guild, serverQueue.songs[0])
        })
        .on('error', error => {
          console.log(error)
        })
        dispatcher.setVolumeLogarithmic(5 / 5)
        serverQueue.textChannel.send(`Started Playing: **${song.title}**`)
      }
      return undefined
  }else if(message.content.startsWith(`${prefix}stop`)){
    if(!message.member.voice.channel) return message.channel.send("You need to be in a Voice Channel to stop the music!")
    if(!serverQueue) return message.channel.send("There is nothing playing right now to stop!")
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
    message.reply("The Music has been stopped!")
    return undefined
  }else if(message.content.startsWith(`${prefix}skip`)){
    if(!message.member.voice.channel) return message.channel.send("You need to be in a Voice Channel to stop the music!")
    if(!serverQueue) return message.channel.send("There is nothing playing right now to skip!")
    serverQueue.connection.dispatcher.end()
    message.channel.send("The Song has been skipped!")
  }else if(message.content.startsWith(`${prefix}volume`)){
    if(!message.member.voice.channel) return message.channel.send("You need to be in a Voice Channel to use this command!")
    if(!serverQueue) return message.channel.send("There is nothing playing right now!")
    if(!args[1]) return message.channel.send(`Current Volume is: **${serverQueue.volume}**`)
    if(isNaN(args[1])) return message.channel.send("Please enter a valid amount to change the volume!") 
    serverQueue.volume = args[1]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
    message.channel.send(`I have changed the volume to: **${args[1]}**`)
    return undefined
  }else if(message.content.startsWith(`${prefix}np`)){
    if(!serverQueue) return message.channel.send("There is nothing playing right now!")
    message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**`)
  }else if(message.content.startsWith(`${prefix}queue`)){
    if(!serverQueue) return message.channel.send("There is nothing playing right now!")
    message.channel.send(`__**Song Queue**__\n ${serverQueue.songs.map(song => `**-**${song.title}`).join('\n')}\n **Now Playing:** ${serverQueue.songs[0].title}`, {split: true})
    return undefined
  }else if(message.content.startsWith(`${prefix}pause`)){
    if(!message.member.voice.channel) return message.channel.send("You need to be in a Voice Channel to pause the music!")
    if(!serverQueue) return message.channel.send("There is nothing playing right now to pause!")
    if(!serverQueue.playing) return message.channel.send("Music is already paused!")
    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause()
    message.channel.send("Music has been paused!")
    return undefined
  }else if(message.content.startsWith(`${prefix}resume`)){
    if(!message.member.voice.channel) return message.channel.send("You need to be in a Voice Channel to pause the music!")
    if(!serverQueue) return message.channel.send("There is nothing playing right now!")
    if(serverQueue.playing) return message.channel.send("Music is already playing!")
    serverQueue.playing = true
    serverQueue.connection.dispatcher.resume()
    message.channel.send("Music has be resumed!")
    return undefined
  }else if(message.content.startsWith(`${prefix}loop`)){
    if(!message.member.voice.channel) return message.channel.send("You need to be in a Voice Channel to loop the music!")
    if(!serverQueue) return message.channel.send("There is nothing playing right now!")
    serverQueue.loop = !serverQueue.loop
    return message.channel.send(`I have now ${serverQueue.loop ? `**Enabled**`: `**Disabled**`}the loop!`)
  }
})
client.on('message', async message=>{
  if(!message.content.startsWith(prefix + 'addrole') || message.author.bot)return;
  if(!message.member.hasPermission("MANAGE_ROLES")){
    return message.channel.send("You do not have permission to add roles")
  };
 
   if(!message.guild.me.hasPermission("MANAGE_ROLES")){
     return message.channel.send("I don't have permissions to add roles")
   };
   let useradd = message.mentions.members.first();

   if(!useradd) {
     return message.channel.send("Please mention the member to who you want to add roles")
   }
   let role = message.mentions.roles.first();
   if(!role) {
    return message.channel.send("Mention the role you want to add")
  }


 if(useradd.roles.cache.has(role)) {
    return message.channel.send("Given User already has that role")
  }
  useradd.roles.add(role)

await message.channel.send(`Added ${role} to ${useradd}`)

})
client.on('message', async message=>{
  if(!message.content.startsWith(prefix + 'removerole') || message.author.bot)return;
  if(!message.member.hasPermission("MANAGE_ROLES")){
    return message.channel.send("You do not have permission to remove roles")
  };
 
   if(!message.guild.me.hasPermission("MANAGE_ROLES")){
     return message.channel.send("I don't have permissions to remove roles")
   };
   let useradd = message.mentions.members.first();

   if(!useradd) {
     return message.channel.send("Please mention the member to who you want to remove roles")
   }
   let role = message.mentions.roles.first();
   if(!role) {
    return message.channel.send("Mention the role you want to remove")
  }


 if(useradd.roles.cache.has(role)) {
    return message.channel.send("Mentioned user does not has that role")
  }
  useradd.roles.remove(role)

await message.channel.send(`Removed ${role} from ${useradd}`)

})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'test') {
                  message.reply('The bot will now shut down.\n'
                          + 'Confirm with `yes` or deny with `no`.');
                  message.channel.awaitMessages(m => m.author.id == message.author.id,
                          {max: 1, time: 30000}).then(collected => {
                                  if (collected.first().content.toLowerCase() === 'yes') {
                                          message.reply('Shutting down...');
                                  }

                                  else
                                          message.reply('Operation canceled.');      
                          }).catch(() => {
                                  message.reply('No answer after 30 seconds, operation canceled.');
                          });
          }  
});
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'etest') {
                  message.reply('The bot will now shut down.\n'
                          + 'Confirm with a thumb up or deny with a thumb down.');
                  message.react('👍').then(r => {
                          message.react('👎');
                  });
                  message.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'),
                          { max: 1, time: 30000 }).then(collected => {
                                  if (collected.first().emoji.name === '👍') {
                                          message.reply('Shutting down...');
                                  }
                                  else
                                          message.reply('Operation canceled.');
                          }).catch(() => {
                                  message.reply('No reaction after 30 seconds, operation canceled');
                          });


          }  
});
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'animated') {
   message.channel.send('<a:hypGirl:737005994839769114>');
   message.channel.send('<a:s_dcstaff:727439000343674911> hi')
  }
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
  if (command === 'laugh') {
    let gif = ["https://media.giphy.com/media/dC9DTdqPmRnlS/giphy.gif", "https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif", "https://media.giphy.com/media/Z9OGuQyrfHAE8/giphy.gif", "https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif", "https://media.giphy.com/media/gE6IUBRWZd744/giphy.gif", "https://media.giphy.com/media/B0vFTrb0ZGDf2/giphy.gif", "https://media.giphy.com/media/MaDPRbg28hwMITPEq2/giphy.gif", "https://media.giphy.com/media/T5S0EmJb2BFv2/giphy.gif"]
    let result = Math.floor((Math.random() * gif.length));
    var gifa = gif[result]
    const embed = {
    "color": 3066993,
    "timestamp": new Date(),
    "footer": "Bot made by Champion2049#3714",
    "image": {
      "url": gifa
    },
    "fields": [
      {
        "name": `${message.author.username} had a nice laugh`,
        "value": "Hehehe",
        "inline": true
      }
    ]
  };
  message.channel.send({ embed });
    message.delete()
  }
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).split(/ +/);
       const command = args.shift().toLowerCase();
       const channel = message.mentions.channels.first();
  if (command === 'set_welcome_channel') {
    if(!args[0]){
      message.reply("Please type a channel name")
    if(!args[1] === channel){
      message.reply("Please Enter a valid channel name!")
    }
  }if(message.member.hasPermission("ADMINISTRATOR")){
    if(channel){
      message.reply(`${channel} has been set as the Welcome channel for ${message.guild.name}`)
    }
  }else(message.reply("Sorry you dont have the permission to advocate this command!"))
    const n = channel
     client.on('guildMemberAdd', member => {
      if (!n) return;
      const embed = new Discord.MessageEmbed()
      .setTitle(`<a:cc_welcome:745581154417246230> Welcome to ${message.guild.name} <a:lala:745584123011137577>`)
      .setDescription(`<a:YAY:745576439222370375> Thanks for joining the server ${member} <a:YAY:745576439222370375>`)
      .setTimestamp()
      .setColor("GREEN")
      .setThumbnail()
      n.send(embed)
    })
  }
})
client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
if (command === 'invites') {
      let user = message.author;

      message.guild.fetchInvites()
      .then

      (invites =>
          {
              const userInvites = invites.array().filter(o => o.inviter.id === user.id);
              var userInviteCount = 0;
              for(var i=0; i < userInvites.length; i++)
              {
                  var invite = userInvites[i];
                  userInviteCount += invite['uses'];
              }
                   message.reply(`You have ${userInviteCount} invite(s)`);
          }
      )
  }
});
client.on('message', async message => {
  const args = message.content.substring(prefix.length).split(" ")
  const mentionedMember = message.mentions.members.first()
if (message.content.startsWith(`${prefix}kick`)) {
  const reason = args.slice(2).join(" ") 
  if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don't have the permission to advocate this command")
  if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send("I don't have the permission to advocate this command")
  if(!args[1]) return message.channel.send("You need to specify someone to kick")
  if(!mentionedMember) return message.channel.send("Please mention a valid user")
  if(mentionedMember.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) return message.channel.send("You cant kick this member due to the role heirarchy") 
  if(mentionedMember.id === message.author.id) return message.channel.send("Why do you want to kick yourself? :rofl:")
  if(mentionedMember.kickable){
    var embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
    .setThumbnail(mentionedMember.user.displayAvatarURL())
    .setColor("BLUE")
    .setDescription(`
      **Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
      **Action:** Kick
      **Advocated By:** ${message.author.username}
      **Reason:** ${reason || `Undefined`}
    `)
    .setFooter(`Bot made by Champion2049#3714`, 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
    message.channel.send(embed)
    mentionedMember.createDM(embed)
    mentionedMember.kick();
  }else{
    return message.channel.send("I cant kick this user make sure I have been given the required Permissions ")
  }return undefined
}
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
if (command === 'userinfo') {
  const user = message.mentions.users.first();
  if(message.mentions.users.first()){
    if(args[0]){
      const act = user.presence.activities
      if(user.presence.activities.values(0)) {var activities = 'He is not doing anything right now!'}
      else {var activities = act}
      const avatar = user.displayAvatarURL({dynamic: true})
      let embed = new Discord.MessageEmbed()
      .setTitle(`Information about ${user.tag}`)
      .addField(`Username:`, `${user.username}`)
    .addField(`ID:`, `${user.id}`)
    .addField(`Last Message:`, `${user.lastMessage}`)
    .addField(`Activity`, `${activities}`)
    .setThumbnail(avatar)
    .addField(`Bot:`, `${user.bot}`)
    .addField(`Presence:`, `${user.presence.status}`)
    .addField(`Created At:`, `${user.createdAt}`)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter(`Bot made by Champeion2049#3714`, `https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256`)
      message.channel.send(embed)
    }
  }
    else{
    const act = message.author.presence.activities
    if(message.author.presence.activities.values(0)) {var activities = 'He is not doing anything right now!'}
    else {var activities = act}
    const avatar1 = message.author.displayAvatarURL({dynamic: true})
    let sembed = new Discord.MessageEmbed()
    .setTitle(`Information about ${message.author.tag}`)
    .addField(`Username:`, `${message.author.username}`)
    .addField(`ID:`, `${message.author.id}`)
    .addField(`Last Message:`, `${message.author.lastMessage}`)
    .addField(`Activity:`, `${activities}`)
    .setThumbnail(avatar1)
    .addField(`Bot:`, `${message.author.bot}`)
    .addField(`Presence:`, `${message.author.presence.status}`)
    .addField(`Created At:`, `${message.author.createdAt}`)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter(`Bot made by Champeion2049#3714`, `https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256`)
    message.channel.send(sembed)
  }
}
})
client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
if (command === 'rr') {
    message.delete()
    if(!args[0]) return message.channel.send(`Please specify the role and the reaction(dcrr <role name> <reaction> <role name> <reaction> )!`);
    if(!args[1]) return message.channel.send("Please specify the reaction to be added!")
    const role = message.mentions.roles.first()
    if(!role) return message.channel.send(`Enter a valid role name`)
    if(!args[2]) return message.channel.send("Please enter one more role!")
    if(!args[3]) return message.channel.send("Please specify the reaction for the second role!")
    const m = await message.channel.send(`React to ${args[1]} to get ${args[0]} & React to ${args[3]} to get ${args[2]}`)
    m.react(`${args[1]}`)
    m.react(`${args[3]}`)
client.on('messageReactionAdd', async(reaction,user)=>{
  if(reaction.message.partial) await reaction.message.fetch
  if(reaction.partial) await reaction.fetch()
  if(user.bot) return
  if(reaction.message.id = m.id){
    if(reaction.emoji.name = args[1]) await reaction.message.guild.members.cache.get(user.id).roles.add(x => x.name === args[0])
    if(reaction.emoji.name = args[3]) await reaction.message.guild.members.cache.get(user.id).roles.add(x => x.name === args[2])
  }
  })
  client.on('messageReactionRemove', async(reaction,user)=>{
    if(reaction.message.partial) await reaction.message.fetch
    if(reaction.partial) await reaction.fetch()
    if(user.bot) return
    if(reaction.message.id = m.id){
      if(reaction.emoji.name = args[1]) await reaction.message.guild.members.cache.get(user.id).roles.remove(x => x.name === args[0])
      if(reaction.emoji.name = args[3]) await reaction.message.guild.members.cache.get(user.id).roles.remove(x => x.name === args[2])
    }
    })
}
})
client.on('message', async message => {
  if(message.content.startsWith(`${prefix}covid`)){
    const covidStats = await covid.all()
    const embed = new Discord.MessageEmbed()
    .setTitle("**COVID19 Stats**")
    .setColor("BLUE")
    .setImage('https://images-ext-2.discordapp.net/external/sDq8ardBtIlvciU5MDlnIRd9XkLev2Pn9UTKy3I6dAo/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/695465125230018562/a75db4b231deb1f54149afaa48779fe5.webp')
    .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
    .addFields(
      {name: `Total Cases`, value: covidStats.cases.toLocaleString(), inline: true},
      {name: `Today's Cases`, value: covidStats.todayCases.toLocaleString(), inline: true},
      {name: `Total Deaths`, value: covidStats.deaths.toLocaleString(), inline: true},
      {name: `Deaths Today`, value: covidStats.todayDeaths.toLocaleString(), inline: true},
      {name: `Total Recoveries`, value: covidStats.recovered.toLocaleString(), inline: true},
      {name: `Today's Recoveries`, value: covidStats.todayRecovered.toLocaleString(), inline: true},
      {name: `Active Infections`, value: covidStats.active.toLocaleString(), inline: true},
      {name: `Critical Condition`, value: covidStats.critical.toLocaleString(), inline: true},
      {name: `Total Tested(negative+positive)`, value: covidStats.tests.toLocaleString(), inline: true}
    )
    return message.channel.send(embed)
  }
})

client.login('NzMwNjQ0MzQ5ODk3MDE1MzA3.Xwafkw.wFHybJO8bgC45AC8y7GbKT3-mD0');