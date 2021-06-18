/* Import Modules*/
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const {
    addRole
} = require('./helpers/reactionRoles');
// .env consts
require('dotenv').config();
const clientToken = process.env.TOKEN;
const clientPrefix = process.env.PREFIX;
const clientOwner = process.env.OWNER;
// Init database
require("./database/database");
/* Initialize client*/
const client = new Commando.Client({
 partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'],
    ws: { intents: ["DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "GUILDS", "GUILD_BANS", "GUILD_EMOJIS", 
    "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", 
    "GUILD_VOICE_STATES"] },
    owner: clientOwner,
    commandPrefix: clientPrefix,
    disableEveryone: true,
    unknownCommandResponse: false
})
/* Initialize Commanmds, CommandsGroups */

client.registry
    // Registers your custom command groups
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Comandos de moderacion'],
        ['info', 'info'],
        ['guild', 'Guild'],
        ['other', 'other']
    ])
    .registerDefaultGroups()

    // Registers all built-in groups, commands, and argument types
    .registerDefaultCommands({
        help: false,
        ping: false,
        unknownCommandResponse: false
    })
    
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));
    /* Initialize Database*/
client.setProvider(
    sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);


/* Start up method*/
const activityEmoji = client.emojis.cache.find(emoji => emoji.name === "booster");
const activities = [
    activityEmoji + "Level 3 EZ.",
    "BHL <3",
];
const channelNames = [
    client.guilds.cache.get("831173275647213617")
]
client.on('ready', () => {
    client.user.setActivity("Starting...")
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];
    
        client.user.setActivity(newActivity);
      }, 20000);  

});
client.on('message', (message) => {
    msg = message.content.toLowerCase();
    if(msg == 'ez'){
        message.react("852675346969264209")
    }
})
client.on('messageReactionAdd', (reaction, user) => {
 console.log(reaction)
});
client.on('messageReactionRemove', (reaction, user) => {
console.log(reaction) 
})
client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.cache.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetch(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});
client.on('raw', packet => {
console.log(packet)
})
/* Client login*/
client.login(clientToken);
