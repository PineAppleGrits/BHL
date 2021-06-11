const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class removeRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name:"removerole",
            aliases: ["remove-role", "rrole"],
            group: 'moderation',
            memberName: 'removerole',
                 guildOnly: true, 
            description: 'Removes a role from a user.',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to remove the role from?",
                    key:"user",
                },
                {
                    type:"role",
                    prompt:"Which role would you like to remove?",
                    key:"role"
                }
            ]
        })
    }
    run(message, { user, role }) {
 const author = message.member.user
    const member = message.guild.members.cache.get(author.id)
	const miembro = message.guild.members.cache.get(user.id)

    if(message.author.id == message.guild.ownerID){
                message.guild.member(user).roles.remove(role)
        const embed = new MessageEmbed();
      
    embed
      .setColor(0x5dc4ff)
      .setAuthor('Roles Changed!', user.displayAvatarURL({ format: 'png', dynamic: true }))
      .setDescription('Forcing action made by the server\'s owner')
      .addField(`Member`, `<@${user.id}> |  ${user.tag}`)
      .addField(`Removed role`,`• ${role}`)
      .setFooter(`Moderator: ${message.author.tag}`, message.author.avatarURL({ format: 'png', dynamic: true }))
      .setTimestamp();
        return message.channel.send(embed);
        
    }
	if(member.roles.highest.rawPosition < miembro.roles.highest.rawPosition || user == message.guild.ownerID){
		const embed = new MessageEmbed()
        .setDescription('You cannot modify the roles of a user that is above you')
	    .setColor('#FF0000');
        return message.channel.send(embed);
    }
    	/*if(member.roles.highest.rawPosition == miembro.roles.highest.rawPosition){
		const embed = new MessageEmbed()
        .setDescription('You cannot modify the roles of a user that is in the same position')
	    .setColor('#FF0000');
        return message.channel.send(embed);
    } */
    
    	if(member.roles.highest.rawPosition < role.rawPosition){
		const embed = new MessageEmbed()
        .setDescription('You cannot use roles that are above you')
	    .setColor('#FF0000');
        return message.channel.send(embed);
    }
    
    if(user.hasrol)
    
                message.guild.member(user).roles.remove(role)
        const embed = new MessageEmbed();
    embed
      .setColor(0x5dc4ff)
      .setAuthor('Roles Changed!', user.displayAvatarURL({ format: 'png', dynamic: true }))
      .addField(`Member`, `<@${user.id}> |  ${user.tag}`)
      .addField(`Removed role`,`• ${role}`)
      .setFooter(`Moderator: ${message.author.tag}`, message.author.avatarURL({ format: 'png', dynamic: true }))
      .setTimestamp();
        return message.channel.send(embed);
 
    
    }
}
