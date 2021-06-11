const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Checks the bot\'s ping to the Discord server.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		const pingMsg = await msg.reply('Pinging...');
		const pingEmbed = new Discord.MessageEmbed()
        .setTitle("Pong! 🏓")
        .setColor(0x00AE86)
        .setDescription(`${msg.channel.type !== 'dm' ? `${msg.author},` : ''} El tiempo de respuesta es de ${this.client.ws.ping ? `El latido del bot es de ${Math.round(this.client.ws.ping)}ms.` : ''}`)
        .setFooter("Brawlhalla Hardcore League, ")
        .setTimestamp();
        return pingMsg.edit(pingEmbed)
	}
};
