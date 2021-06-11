/* Import Modules*/
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

// .env consts
require('dotenv').config();
const clientToken = process.env.TOKEN;
const clientPrefix = process.env.PREFIX;
const clientOwner = process.env.OWNER;
/* Initialize client*/
const client = new Commando.Client({
    owner: clientOwner
})
/* Initialize Commanmds, CommandsGroups */
client.registry
    .registerGroups([
        ['info', 'Comandos de informacion']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

/* Initialize Database*/
client.setProvider(
    sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);


/* Start up method*/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  


/* Client login*/
client.login(clientToken);