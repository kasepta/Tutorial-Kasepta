const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = '!'

client.on('ready', () => {
    
    let botStatus = [
        `${prefix}help`,
        `${client.users.cache.size} users!`,
        `${client.guilds.cache.size} servers!`
    ]
    
    setInterval(function() {
        let status = botStatus[Math.floor(Math.random() * botStatus.length)];
        client.user.setActivity(status, {type: 'WATCHING'})
    }, 5000);

    console.log(`${client.user.username} is online!`)
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        message.channel.send('pong')
    }
})

client.login('TOKEN')