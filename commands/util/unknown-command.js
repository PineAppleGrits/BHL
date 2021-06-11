const { Command} = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class UnknownCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unknown',
			group: 'util',
			memberName: 'unknown',
			description: 'Displays help information for when an unknown command is used.',
			examples: ['unknown'],
			unknown: true,
			hidden: true
		});
	}

	run(msg) {
        const embed = new Discord.MessageEmbed()
        .setDescription('```diff\n -2\n```');
		return msg.reply('Te confundiste de commando mepa.. (<-Testeando unknown comamnd->)')
		
		/*return msg.reply(
			`Unknown command. Use ${msg.anyUsage(
				'help',
				msg.guild ? undefined : null,
				msg.guild ? undefined : null
			)} to view the command list.`
		); */
	}
};
