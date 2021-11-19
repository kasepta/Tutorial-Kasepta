module.exports = (client) => {
    client.on("messageCreate", message => {

        function reply(ask, answer) {
            if (message.content.toLowerCase() === ask && !message.author.bot) {
                return message.channel.send(answer)
            }
        }

        reply('halo', 'holaaaa')
        reply('tes', 'tastestastes')
        // reply('halo', 'oitt')
    })
}