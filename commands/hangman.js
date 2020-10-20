const Discord = require('discord.js');
const HangmanGame = require('hangcord');
const db = require('quick.db')
module.exports = {
    name: 'hangman',
    description: 'Who want to play hangman???',
    cooldown: 5,
    guildOnly: false,
    category: 'Game',
    execute(message) {
        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "dc"
       const hangman = new HangmanGame({
  title: 'Hangman',
  color: 'BLUE',
  timestamp: true,
  gameOverTitle: 'Game Over'
}); 

  hangman.newGame(message);
    }
}