const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class UserInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      group: 'other',
      memberName: 'userinfo',
      description: 'Displays information a user',
	  args: [
	  {
		key: 'mencion',
		type: 'member',
		prompt: 'asdf',
	  }
	  
	  ]
    })
  }

  run = async (message, { mencion }) => {
    const { guild, channel } = message

    const user = message.member.user
    const member = guild.members.cache.get(user.id)
	const miembro = guild.members.cache.get(mencion.id)

    console.log(member)

    const embed = new MessageEmbed()
      .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
      .addFields(
        {
          name: 'User tag',
          value: user.tag,
        },
        {
          name: 'Is bot',
          value: user.bot,
        },
        {
          name: 'Nickname',
          value: member.nickname || 'None',
        },
        {
          name: 'Joined Server',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: 'Joined Discord',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: 'Roles',
          value: member.roles.cache.size - 1,
        }
      )

    channel.send(embed)
    console.log("////////////////////////////////////")
	console.log(member.__roles)
	console.log("////////////////////////////////////")
	console.log(member.roles.highest.rawPosition)
	if(member.roles.highest.rawPosition < miembro.roles.highest.rawPosition){
		message.channel.send('ok')
	}
  }
}