const { MessageEmbed } = require("discord.js")
let guildInvites = new Map()
const { prefix } = require('@root/config.json')

module.exports = async (client) => {

    client.on('message', async message => {
        if (message.content !== `${prefix}loadinvite` || message.author.bot) return;
        guildInvites.set(message.guild.id, await message.guild.fetchInvites())
        const cachedInvites = await guildInvites.get(message.guild.id)
        return message.channel.send(`**${cachedInvites.size}** invites has loaded !`)
    })

    client.on('inviteCreate', async invite => {
        guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
    })

    client.on('guildMemberAdd', async member => {
        const cachedInvites = await guildInvites.get(member.guild.id)
        const newInvites = await member.guild.fetchInvites()
        guildInvites.set(member.guild.id, newInvites)

        try {
            const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)
            const msga = new MessageEmbed()
            .setDescription(`${member.user} **joined**\nInvited by **${usedInvite.inviter.username}** (**${usedInvite.uses}** invites)\n\nLink used: ${usedInvite.url}`)
            .setTimestamp()
            const joinchannel = member.guild.channels.cache.get('889520653290586173')
            joinchannel.send(msga)
        } catch(err) {
            let embed = new MessageEmbed()
            .setColor('YELLOW')

            if (member.user.bot) {
                embed.setDescription(`${member.user} joined using OAuth.`)
            } else {
                embed.setDescription(`${member.user} **joined**, i don't know who invited.`)
            }

            member.guild.channels.cache.get('889520653290586173').send(embed)
        }
    })
}