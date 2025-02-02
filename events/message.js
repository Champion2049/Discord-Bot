const Discord = require("discord.js")
//const prefix = 'dc'
const db = require('quick.db')
const fetch = require("node-fetch").default
//client.on('message', message => {
/*if(!message.content.startsWith(prefix)) return
  const args = message.content.substring(prefix.length).split(" ")
  if(message.content.startsWith(`${prefix}setprefix`)){
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You dont have the Required permissions to advocate this command!')
    if(!args[1]) return message.channel.send("Please specify a prefix!")
    if(args[1].length>4) return message.channel.send("A prefix can only have 3 or less than 3 characters!")
    if(args[1] === db1.get(`guild_${message.guild.id}_prefix`)) return message.channel.send("That is already set as the prefix!")
    if(args[1] === "dc") db1.delete(`guild_${message.guild.id}_prefix`)
    db1.set(`guild_${message.guild.id}_prefix`, args[1])
    return message.channel.send(`I have now set your prefix to ${args[1]}`)
  }
})*/
module.exports = (client, message) => {
    if(message.author.bot) return
    if(message.channel.type === 'dm') return
    if(message.channel.id === "822435300264378378"){
        fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
        .then(response => response.json())
        .then(data => {
            message.channel.send(data.response)
        })
        .catch(() => {
            message.channel.send("Couldn't fetch the response!")
        })
    }
    else if(message.channel.name === "ai-chat"){
        fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
        .then(response => response.json())
        .then(data => {
            message.channel.send(data.response)
        })
        .catch(() => {
            message.channel.send("Couldn't fetch the response!")
        })
    }
    const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
    if(!message.content.startsWith(prefix)) return 
    const args = message.content.substring(prefix.length).split(" ")
    const command = client.commands.get(args[0])
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))    
        if(!command) return
        if(!client.cooldowns.has(command.name)){
            client.cooldowns.set(command.name, new Discord.Collection())
        }
        const now = Date.now()
        const timestamps = client.cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 0) * 1000
        if(timestamps.has(message.author.id)){
            const expirationDate = timestamps.get(message.author.id) + cooldownAmount
            if(now < expirationDate){
                const timeLeft = (expirationDate - now) / 1000
                const m = message.channel.send(`Please wait **${timeLeft.toFixed(1)}** seconds before executing the **${command.name}** command again!`)
                return m.then(m => m.delete({timeout:5000}))

            }
        }
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        try{
            command.execute(message, args, client)
        }catch(error){
            console.log(error)
            return message.channel.send("There was an error executing this command!")
        }
}