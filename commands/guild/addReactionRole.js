//channel, messageId, CUSTOM-EMOJI, ROLE

const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const ReactionRole = require('../../models/reactionRole');
module.exports = class addReactionRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addreactionrole',
			group: 'guild',
			memberName: 'addreactionrole',
            guildOnly: true,
			description: 'Añadir un rol de reaccion.',
			throttling: {
				usages: 5,
				duration: 10
			},
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    type:"channel",
                    prompt:"Porfavor indica el canal al que irá el rol de reaccion (con #)",
                    key:"textChannel",
                },
                {
                    type:"string",
                    prompt:"Porfavor indica el ID del mensaje al que ira el rol de reaccion.",
                    key:"messageId"
                },
                {
                    type:"custom-emoji",
                    prompt:"Porfavor indica el emoji al que ira el rol de reaccion.",
                    key:"emojiId"
                },
                {
                    type:"role",
                    prompt:"Porfavor indica el rol de reaccion.",
                    key:"role"
                }
            ]
		});
	}

	async run(message, {textChannel, messageId, emojiId, role}) {
        try {
            const newReactionRole = new ReactionRole({
                channelId: textChannel.id,
                messageId,
                emojiId: emojiId.id,
                roles: role.id
              });
            
              await newReactionRole.save();
              var emoji = await message.guild.emojis.cache.get(emojiId.id)
            var fetched = await message.guild.channels.cache.get(textChannel.id).messages.fetch(messageId)
            await fetched.react(emoji);
            message.reply(`Rol de reaccion añadido con exito.`);
            
        } catch (err) {
            console.log(err)
        }
        
	}
};