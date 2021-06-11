const { Command} = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class UnknownCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unknown-command',
			group: 'util',
			memberName: 'unknown-command',
			description: 'Displays help information for when an unknown command is used.',
			examples: ['unknown-command kickeverybodyever'],
			unknown: true,
			hidden: true
		});
	}

	run(msg) {
        const embed = 
		return msg.reply(
			`Unknown command. Use ${msg.anyUsage(
				'help',
				msg.guild ? undefined : null,
				msg.guild ? undefined : null
			)} to view the command list.`
		);
	}
};
