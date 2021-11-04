const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    
    let botStatus = [
        `Invite gue lah..`,
        `${client.users.cache.size} users!`,
        `${client.guilds.cache.size} servers!`
    ]
    
    setInterval(function() {
        let status = botStatus[Math.floor(Math.random() * botStatus.length)];
        client.user.setActivity(status, {type: 'WATCHING'})
    }, 5000);

    console.log(`${client.user.username} is online!`)
})

client.login('TOKEN')