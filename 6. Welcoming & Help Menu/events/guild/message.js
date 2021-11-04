const { prefix } = require('@root/config')
const Timeout = new Map();

module.exports = async (client, message) => {

    if(message.author.bot) return
    if(!message.guild) return
    if(message.channel.type === 'dm') return
    if(!message.content.toLowerCase().startsWith(prefix)) return
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return

    let command = client.commands.get(cmd)

    if (!command) command = client.commands.get(client.aliases.get(cmd))
    || client.commands.find(commands => commands.aliases && commands.aliases.includes(cmd));
    
    
    if (command) {
        const timeout = command.timeout;
        const key = message.author.id + message.guild.id + command.name;
        const found = Timeout.get(key);
        if(timeout){
            if(found) {
                return message.channel.send(`**${message.author.username}**! Please wait command cooldown!`)
                .then(m => m.delete({ timeout: timeLeft })).catch(err => console.log(err.message))
            }else{
                //command running
                command.run(client, message, args);
                Timeout.set(key, Date.now());
                setTimeout(() => {
                    Timeout.delete(key)
                }, timeout);
            }
        }else{
            command.run(client,message,args)
        }
    }
}