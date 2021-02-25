const db = require("quick.db")
const Discord = require('discord.js');
module.exports =  {
    name: "newprofile",
    description: "make a profile",
    aliases: ["newp"],
    cooldown: 3,
    async execute(message){
        const profiles = new db.table("profiles")
        const userProfile = profiles.get(`profiles_${message.author.id}`)
        if(userProfile) return message.channel.send("You already have a profile!")
        message.channel.send("Please enter a username!")
        const filter = (user) => {
            return user.author.id === message.author.id
        }
        message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
        .then(collected => {
            const name = collected.first().content
            const regex = !/[^a-zA-Z0-9 ]+/g.test(name)
            if(!regex) return message.channel.send("Your username can only contain numbers and letters!")
            profiles.set(`profiles_${message.author.id}.name`, name)
            return message.channel.send("Your Profile has been created!")
        })
    }
}