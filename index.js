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
const activities = [
    "<:booster:852729738930028614> Level 3, EZ.",
    "BHL <3",
  ];
/* Initialize client*/
const client = new Commando.Client({
    owner: clientOwner,
    commandPrefix: clientPrefix,
    disableEveryone: true,
})
/* Initialize Commanmds, CommandsGroups */
const path = require('path');

client.registry
    // Registers your custom command groups
    .registerDefaultTypes()
    .registerGroups([
        ['fun', 'Fun commands'],
        ['some', 'Some group'],
        ['other', 'Some other group'],
        ['info', 'info']
    ])
    .registerDefaultGroups()

    // Registers all built-in groups, commands, and argument types
    .registerDefaultCommands()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));
/* Initialize Database*/
client.setProvider(
    sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);


/* Start up method*/
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];
    
        client.user.setActivity(newActivity);
      }, 20000);  
});
  

client.on('debug', e => {console.log(e)})
/* Client login*/
client.login(clientToken);