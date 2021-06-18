const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'prune',
      aliases: ['delete-messages', 'bulk-delete', 'clear', 'purge'],
      description: 'Delete up to 101 recent messages',
      group: 'moderation',
      memberName: 'prune',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
      clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
      args: [
        {
          key: 'deleteCount',
          prompt: 'How many messages do you want to delete?',
          type: 'integer',
          validate: deleteCount => deleteCount < 101 && deleteCount > 0
        },
      ]
    });
  }

  run(message, { deleteCount }) {
    message.channel
      .bulkDelete(deleteCount)
      .then(messages => message.say(`Deleted ${messages.size} messages`))
  .then(msg => {
    msg.delete({ timeout: 3000 })
  })
      .catch(e => {
        console.error(e);
        return message.say(
          'Something went wrong when trying to delete messages :('
        );
      });
  }
};
