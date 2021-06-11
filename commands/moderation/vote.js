const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class VoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            group: 'moderation',
            memberName: 'vote',
            description: "Starts a yes/no/neutral vote.",
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ["MANAGE_MESSAGES"],
                 guildOnly: true, 
            examples: ['!vote "Question" "Description"'],
            args: [
                {
                    key: 'question',
                    prompt: 'What is the vote question?',
                    type: 'string',
                    validate: question => {
                        if (question.length < 1001 && question.length > 2) return true;
                        return 'Polling questions must be between 1 and 1000 characters in length.';
                    }
                },
                {
                    key: 'desc',
                    prompt: '(Optional) Do you have more details?',
                    type: 'string',
                    default: ' ',
                    validate: desc => {
                        if (desc.length < 1001 && desc.length > 2) return true;
                        return 'Polling questions must be between 1 and 1000 characters in length.';
                    }
                }
                
            ]
        });
    }
    
    run(msg, { question, desc}) {
        let embed = new MessageEmbed()
            .setThumbnail(msg.client.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTitle(question)
            .setDescription(desc)
            .setAuthor(msg.author.tag, msg.author.avatarURL({ format: 'png', dynamic: true }))
            .setColor(0x347ff7)
            .setTimestamp();
            
            embed.setFooter(`Made with luv`)
            
        msg.delete();
        
        msg.channel.send({embed: embed}).then(embedMessage => {
    embedMessage.react('👍')
    embedMessage.react('👎')
    embedMessage.react('🤷')
            .catch(console.error);
    })
   }
};