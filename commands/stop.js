const Discord = require('discord.js');
const deleteafter = 20000;

exports.run = async (client, message, args) => {
  try {
      if (!message.member.voice.channel) { 
        message.delete().catch(O_o=>{})
        message.channel.send("You are not in a voice channel, **join a voice chat and try again!**")
        .then(msg => { 
                msg.delete({ timeout: deleteafter }) 
        })
        return;
        } else {
          try {
            message.member.voice.channel.leave()
            message.delete().catch(O_o=>{})
                    message.channel.send("**Streaming Radio** has been stopped, thanks for listening to the stream music!")
                .then(msg => { 
                        msg.delete({ timeout: deleteafter }) 
                })
            return connection.disconnect(streamurl)
            .then(dispatcher => {
                    dispatcher.on('error', console.error)
            })
    } catch (ex) {
    console.log(ex.stack);
    }
        } } catch (error) {
          return message.channel.send(`Stop Command Error: ${error.message}`);
          // Restart the bot as usual.
        }
}

exports.help = {
  name: "stop",
  description: "stop stream radio music!"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // This number is a seconds, not a milliseconds.
  // 1 = 1 seconds.
}