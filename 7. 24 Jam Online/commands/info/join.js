
module.exports = {
    name: "join",
    run: async (client, message, args) => {
        if (message.author.id !== '528623488454361099') return
        await client.emit('guildMemberAdd', message.member);
}
}