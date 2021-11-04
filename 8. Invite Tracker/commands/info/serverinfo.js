const { MessageEmbed } = require('discord.js');
let region = {
    "brazil": ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    "singapore": ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    "sydney": ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "india": ":flag_in: India",
    "london": ":flag_gb: London",
    "amsterdam": ":flag_nl: Amsterdam",
    "hongkong": ":flag_hk: Hong Kong",
    "russia": ":flag_ru: Russia",
    "southafrica": ":flag_za:  South Africa"
};

module.exports = {
    name: "server",
    aliases: ['serverinfo'],
    description: "server info check",
    timeout: 10000,
    category: "info",
    run: async (client, message) => {

        const { guild } = message
        const { name, memberCount } = guild
        const icon = guild.iconURL({dynamic:true})
    
        const embed = new MessageEmbed()
          .setTitle(`${name}`)
          .setThumbnail(icon)
          .setColor('#00f050')
          .setTimestamp()
          .setFooter(guild.name, icon)
          .addField("**Region**", region[message.guild.region], true)
          .addField("**Citizens**", `${message.guild.members.cache.filter(m => !m.user.bot).size}`, true)
          .addField("🟢**Online**", `${message.guild.members.cache.filter(m => m.user.presence.status == "online").size}`, true)
          .addField("**OWNERSHIP**", guild.owner, true)

        return message.channel.send(embed).catch(err => console.log(err.message))


    }
}