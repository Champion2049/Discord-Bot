module.exports = {
    name: 'ding', 
    description: 'dong',
    aliases: ['d'],
    cooldown: 5,
    execute(message){
        return message.channel.send("Dong!")
    }
}