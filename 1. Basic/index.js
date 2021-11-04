const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`${client.user.username} is online!`)
})

client.login('TOKEN')