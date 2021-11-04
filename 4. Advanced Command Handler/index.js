require('module-alias/register')
const fs = require("fs");
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('@root/config')
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.prefix = config.prefix
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
    require(`@handlers/${handler}`)(client);
})

client.login(config.token)