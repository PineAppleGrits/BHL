const { Command } = require('discord.js-commando');
const { askUser } = require('../../helpers/helpers')
const {
    getPlayer
} = require('../../helpers/rank.js')
module.exports = class RankCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: ['rank'],
            group: 'info',
            memberName: 'rank',
            description: 'Ranks',
        });

    }

    async run(message, args) {
        try {
            if(!message.guild.members.cache.get(message.author.id).premiumSince){
                return msg.reply('Para obtener un rol customizado tenes que boostear el server.')
            }
            let roleName = await askUser(message, "Qué nombre te gustaria que tenga el rol.", 30000)
            let roleColor = await askUser(message, "Qué color te gustaria que tenga el rol.", 30000)
            console.log(roleName)
            console.log(roleColor)
        } catch (e) {
            console.log(e);
            return msg.say('Something went horribly wrong! Please try again later.')
        }
    }
};

