const { Command } = require('discord.js-commando');
const {
    getPlayer
} = require('../helpers/rank.js')
module.exports = class RankCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: ['rank'],
            group: 'info',
            memberName: 'rank',
            description: 'Ranks',
            guildOnly: false,
            args: [{
                key: 'user',
                prompt: 'Enter user name',
                type: 'string'
            }],
        });

    }


    async run(msg, args) {
        try {
            const info = await getPlayer(args.user);
            console.log(info)

        } catch (e) {
            console.log(e);
            return msg.say('Something went horribly wrong! Please try again later.')
        }
    }
};