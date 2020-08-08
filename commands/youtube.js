module.exports = {
    name: 'youtube',
    description: "This is a youtube command!",
    execute(message, args){
        if(message.member.roles.cache.has('734668615575666718')){
            message.channel.send('https://www.youtube.com/channel/UC_X4a0Q9-OmcDWburGtXZIA/featured');
    }else{
        message.channel.send('You dont have the permission to execute this command right now');
        message.member.roles.add('734668615575666718').catch(console.error);
    }
    }
}