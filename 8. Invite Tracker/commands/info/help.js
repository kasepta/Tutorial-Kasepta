const ms = require('ms')
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require('@root/config')

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command]",
    run: async (client, message, args) => {

        if (message.guild.me.hasPermission("EMBED_LINKS")) {
            if (args[0]) {
                return getCMD(client, message, args[0]);
            } else {
                return getAll(client, message);
            }
        } else {
            return message.reply('please enable `EMBED_LINKS` permissions').catch(err => console.log(err.message))
        }
    },
};

function getAll(client, message) {
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name)
    .setColor('#03fcfc')
    .setFooter('Created by kasepta#0003')
    .setThumbnail(message.guild.iconURL({dynamic:true}))

    const commands = (category) => {
        return client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `- \`${cmd.name}\``)
            .join(" ");
    };

    const info = client.categories
        .map(
            (cat) =>
                stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** (${client.commands.filter(cmd => cmd.category == cat).size}) : \n${commands(
                    cat
                )}`
        )
        .reduce((string, category) => string + "\n" + category);
    embed.setFooter(`There are ${client.commands.size} commands`)
    .setAuthor(message.guild.name)
    return message.channel.send(embed.setDescription(info))
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed();

    const cmd =
        client.commands.get(input.toLowerCase()) ||
        client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor('#03fcfc')
        .setAuthor(message.guild.name)
        .setFooter('Created by kasepta#0003')
        .setDescription(info))
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases)
        info += `\n**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: \`${prefix}${cmd.usage}\``;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
    if (cmd.timeout) info += "\n**Timeout**: " + ms(cmd.timeout);
    return message.channel.send(embed.setColor('#03fcfc')
    .setAuthor(message.guild.name)
    .setDescription(info)
    .setFooter('Created by kasepta#0003'))
}
