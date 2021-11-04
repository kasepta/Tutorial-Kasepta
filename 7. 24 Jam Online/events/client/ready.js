const { prefix } = require('@root/config')

module.exports = client => {

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

}