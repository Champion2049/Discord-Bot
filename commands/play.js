const Discord = require('discord.js');
const fetch = require('node-fetch'); //npm install node-fetch
const db = require("quick.db");
const radio = require("./../../stations.json")
const config = require("./../../config.json")

const deleteafter = 20000;

exports.run = async (client, message, args) => {
   try {
        let prefix = await db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = client.config.prefix;
        
        if (!message.member.voice.channel) { 
        message.delete().catch(O_o=>{})
        message.channel.send("You are not in a voice channel, **join a voice chat and try again!**")
        .then(msg => { 
                msg.delete({ timeout: deleteafter }) 
        })
        return
        } else {
        const searchStation = args.join(" ").toLowerCase()
                let url
                let radiostation
                let streamurl
                let found=false
                Object.keys(radio).forEach(function(stn) {
                if (radio[stn].alias.includes(searchStation)) {
                        url = radio[stn].urlLink
                        radiostation = radio[stn].name
                        streamurl = radio[stn].streamurl
                        found=true
                        console.log(`\nUrl:${url}\nRadio Station: ${radiostation}\nStream Url: ${streamurl}\n\n`)
                }
        })

        if (found) {
                let now = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
                let past = new Date().toISOString().split('T')[0]+'T00:00:00'

                try {
                message.member.voice.channel.join()
                .then(connection => {
                        const playingEmbed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Now playing')
                                .setURL(config.radioURL)
                                .setAuthor(client.user.username,
                                        message.guild.iconURL({
                                        format: "png",
                                        dynamic: true,
                                        }),config.radioURL)
                                .setTimestamp()
                                .addField(radiostation,url)                          
                                .setFooter(client.user.username, client.user.avatarURL)
                        message.delete().catch(O_o=>{})
                        message.channel.send(playingEmbed)
                        .then(msg => {
                                msg.delete({ timeout: deleteafter })
                        })
                return connection.play(streamurl)
                .then(dispatcher => {
                        dispatcher.on('error', console.error)
                })
        })
        } catch (ex) {
        console.log(ex.stack);
        }
        } else {
        const pEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('**Play Stream Radio**')
                        .setURL(config.radioURL)
                        .setAuthor(client.user.username,
                                message.guild.iconURL({
                                format: "png",
                                dynamic: true,
                                }),config.radioURL)
                        .setTimestamp()
                        .setDescription("You need to select channel!")
                        .setFooter(client.user.username, client.user.avatarURL)
                for(var stn in radio) { 
                        stnName = radio[stn].name
                        cmd = `${prefix}play ` + radio[stn].alias
                        cmds = `\`${cmd}\``
                        pEmbed.addField('Listen to ' + stnName,cmds)
                }
                message.delete().catch(O_o=>{})
                message.channel.send(pEmbed)
                .then(msg => {
                        msg.delete({ timeout: deleteafter })
                })
        }
        } } catch (error) {
                return message.channel.send(`Play Command Error: ${error.message}`);
                // Restart the bot as usual.
              }
}

exports.help = {
  name: "play",
  description: "play radio stream music!",
  usage: "play <station>"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // This number is a seconds, not a milliseconds.
  // 1 = 1 seconds.
}