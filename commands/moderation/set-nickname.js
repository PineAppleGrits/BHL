const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class NicknameCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nickname',
      aliases: ['nick', 'n'],
      group: 'moderation',
      memberName: 'nickname',
      description: 'Nicknames the selected member with the provided nickname',
      examples: ['nickname Grits#1253 New Nick'],
      clientPermissions: ['MANAGE_NICKNAMES'],
      userPermissions: ['MANAGE_NICKNAMES'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Which member do you want to change the nickname of?',
            type: 'member'
        },
        {
            key: 'nickname',
            prompt: 'What name do you want to change their nickname to?',
            type: 'string'
        }
    ]
    });
  }

  run (msg, { member, nickname }) {
    const oldName = member.displayName;
    const nicknameEmbed = new MessageEmbed();

    member.setNickname(nickname);

    nicknameEmbed
      .setColor(0x5dc4ff)
      .setAuthor('Nickname Changed!', msg.client.user.displayAvatarURL({ format: 'png', dynamic: true }))
      .addField(`Member`, `<@${member.id}> |  ${member.user.tag}`)
      .addField(`Old Name`,`• ${oldName}`)
      .addField(`New Name`,`• ${nickname}`)
      .setFooter(`Moderator: ${msg.author.tag}`, msg.author.avatarURL({ format: 'png', dynamic: true }))
      .setTimestamp();

    if (msg.deletable) {
        msg.delete();
    }

    msg.say(nicknameEmbed);
  }
};
