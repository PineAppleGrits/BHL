const { Command } = require('discord.js-commando');

module.exports = class UnbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unban',
      group: 'moderation',
      memberName: 'unban',
           guildOnly: true, 
      description: 'Unbans a user',
      examples: ['unban @Grits', 'unban @Grits All is forgiven'],
      args: [
        {
          key: 'user',
          prompt: 'Who do you want to unban?',
          type: 'user',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to unban them?',
          type: 'string',
          default: "'None provided'",
        },
		
      ],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
    });
  }

  run(msg, { user, reason }) {
    msg.guild.members.unban(user, reason);
    msg.reply(`${user} was unbanned.`);
  }
};