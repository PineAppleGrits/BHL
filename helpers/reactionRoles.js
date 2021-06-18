const ReactionRole = require('../models/reactionRole')

const reactionRoles = {};

reactionRoles.addRole = async (reaction, user) => {
    try {
        console.log(reaction.message.id)
        var reactionRole = await ReactionRole.find({messageId: reaction.message.id});
        if(!reactionRole){
            return;
        }
        if(reaction.message.id == messageId && reaction._emoji.id == reactionRole.emojiId){
            var role = message.guild.roles.cache.get(reactionRole.roles);
            message.author.addRole(role);
        }
        var role = reaction.message.guild.roles.cache.get(reactionRole.roles);
        user.addRole(role);
    } catch (err) {
        console.log(err)
    }
}

module.exports = reactionRoles;