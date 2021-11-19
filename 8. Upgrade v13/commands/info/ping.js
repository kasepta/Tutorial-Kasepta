module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "ping bot",
    timeout: 10000,
    category: "info",
    run: async (client, message) => {

        message.channel.send('pong...')
    }
}