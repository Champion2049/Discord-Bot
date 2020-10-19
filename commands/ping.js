module.exports = {
    name: 'ding', 
    description: 'dong',
    aliases: ['d'],
    execute(message){
        return message.channel.send("Dong!")
    }
}