const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'help', 
    description: 'shows the help menu',
    aliases: ['h'],
    cooldown: 5,
    async execute(message){
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
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
                              { max: 1, time: 30000 }).then(collected => {
                                      if (collected.first().emoji.name === '🛠') {
                                              const membed = new Discord.MessageEmbed()
                                              .setTitle('<a:modo:758209576029257738> **__Moderation Commands__** <a:modo:758209576029257738>')
                                              .setFooter("Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
                                              .setDescription('**dckick**- kicks the mentioned person\n **dcban**- bans the mentioned person\n **dcclear**- deletes a mentioned amount of messages\n **dcpoll**- creates a poll to vote on\n **dcwarn**- gives the mentioned user a warning\n **dcserverinfo**- gives detailed information about the server\n **dcmute**- mutes the mentioned person for the given amount of time\n **dcaddrole**- adds the mentioned role to the mentioned user\n **dcremoverole**- removes a mentioned role from the mentioned user')
                                              .setColor(0x14c9ed)
                                              m.edit(membed)
                                              m.reactions.removeAll()
                                      }
                                      else if(collected.first().emoji.name === '🎵'){
                                        const muembed = new Discord.MessageEmbed()
                                        .setTitle('**<a:MusicDance:745128069869862922>__Music Commands__<a:BearMusic:745122983751843910>**')
                                        .setFooter("Bot Made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
                                        .setDescription('**dcplay**- plays music from  the given song name\n**dcstop**- stops playing music and leaves the voice channel\n**dcpause**- pauses the music that is playing\n**dcresume**- resumes the paused music\n**dcqueue**- shows the currents song queue\n**dcskip**- skips the song\n**dcvolume**- shows the current volume and if volume value is written after it changes volume to that\n**dcnp**- shows the song that is currently playing\n**dcloop**- loops the queued music(if already looped enter again to exit from loop)')
                                        .setColor(0x14c9ed)
                                        m.edit(muembed)
                                        m.reactions.removeAll()                                 
                                      }
                                      else if(collected.first().emoji.name === '🎉'){
                                        const gembed = new Discord.MessageEmbed()
                                        .setTitle('**<a:kjsc:758210180755750922>__Giveaway Commands__<a:ck_partypack:745123439664169102>**')
                                        .setFooter('Bot made by Champion2049#3714', 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
                                        .setDescription(`**dcgiveaway**- holds a giveaway, usage: dcgiveaway <time> <channel name> <requirements(if any)> <prize>\n More coming soon`)
                                        .setColor(0x14c9ed)
                                        m.edit(gembed)
                                        m.reactions.removeAll()
                                      }
                                      else if(collected.first().emoji.name === '🤪'){
                                        const fembed = new Discord.MessageEmbed()
                                        .setTitle('**<a:BearLaugh:745125674360111145>__Fun Commands__<:HAHAHA:745129345999175730>**')
                                        .setFooter("Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
                                        .setDescription("**dcgif**- searches giphy for the mentioned word(s)\n **dc8ball**- ask a question and it will answer it\n **dcgoogle**- googles the mentioned word(s)\n **dcyoutube**- searches the word(s) on youtube\n **dcurban**- searches the urban dictionary for the mentioned word(s)\n **dcavatar**- shows your or mentioned user's profile picture\n **dckill**- sends a funny message of how the person/ mentioned person died/ was killed\n **dctv**- searches the mentioned word(s) on imdb(movies,series,anime) and gives you the result\n **dcmeme**- gives you a meme from reddit\n **dcping**- shows you the bot's ping\n **dcinvites**- check how many invites you have in the current server\n**dcdadjoke**- sends a funny dad joke\n**dccnjoke**- sends a funny Chuck Norris joke")
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
                                        .setFooter("Bot made by Champion2049#3714", 'https://cdn.discordapp.com/avatars/730644349897015307/6eff6602ff525e3170f13444942fcba0.png?size=256')
                                        .setDescription("**dcbotinfo**- see information about the bot\n**dcinvite**- get the link to invite the bot!\n**dcsupport**- gives you the link to the bot's support server\n **dchelp**- displays the current page containing all the bot's commands\n**dcuserinfo**- gives information about yourself or mentioned user\n**dccovid**- gives COVID19 stats\n**@Easy Use Bot prefix**- shows the bot's prefix\n**dcsetprefix**- set a custom prefix for your guild\n**dcset_welcome_channel**- sets a channel where a Welcome message will be sent whenever a new member joins")
                                        .setColor(0x14c9ed)
                                        m.edit(bembed)
                                        m.reactions.removeAll()
                                      }
                                      else if(collected.first().emoji.name === '❌'){
                                        m.edit('Closing....').then(msg => msg.delete({timeout: 5000}));
                                      }
                                      else
                                              message.reply('Operation canceled.');
                              })
          message.delete();
        }
      }
    }