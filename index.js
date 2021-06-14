/* Import Modules*/
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

// .env consts
require('dotenv').config();
const clientToken = process.env.TOKEN;
const clientPrefix = process.env.PREFIX;
const clientOwner = process.env.OWNER;
// Code Const

/* Initialize client*/
const client = new Commando.Client({
    owner: clientOwner,
    commandPrefix: clientPrefix,
    disableEveryone: true,
    unknownCommandResponse: false
})
/* Initialize Commanmds, CommandsGroups */
const path = require('path');

client.registry
    // Registers your custom command groups
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Comandos de moderacion'],
        ['info', 'info'],
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
    if(message.toLowerCase() == 'ez'){
        message.react("852675346969264209")
    }
})

/* Client login*/
client.login(clientToken);