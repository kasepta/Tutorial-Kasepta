
module.exports = {
    name: "left",
    run: async (client, message, args) => {
        if (message.author.id !== '528623488454361099') return
        await client.emit('guildMemberRemove', message.member);
}
}