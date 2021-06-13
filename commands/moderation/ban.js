const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { DiscordEmbedMenu } = require('discord.js-embed-menu');
const { messages } = require('../../helpers/messages.json');
const reasons = messages.ban;
module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['ban-member', 'ban-hammer'],
      memberName: 'ban',
      group: 'moderation',
      description: 'Bans a tagged member',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Please mention the user you want to ban with @ or provide his ID',
          type: 'user',
        },
      ],
    });
  }
  async run(message, {userToBan}) {
    try {
      var reason = "";
      var reasonMsg = "Porfavor seleccione una razón para proceder con la sanción."
      var arr = "";
      var notifyUser = true;
      var roles = message.member.roles.member._roles;
      roles.forEach(element => arr += `<@&${element}>`);
      let menu = new DiscordEmbedMenu(message.channel, message.author, [
        {
       
            name: 'main',
            content: new MessageEmbed({
              title: `Aplican bar al usuario: ${userToBan.username}`,
              description: 'Reaccionar para realizar sanción.',
      thumbnail: {
      url: userToBan.avatarURL({format: 'png', dynamic: true}),
      },
              fields: [
                  {
                      name: "Usuario",
                      value: userToBan,
                      inline: true
                  },
                  {
                      name: "Roles",
                      value: arr,
                      inline: true
                  },
                  {
                      name: "Razon de sanción",
                      value: reasonMsg,
                      inline: false
                  }
                ]
            }),
            reactions: {
              '📝': 'sub-menu',
                '✉️': async (menu) => {
                    menu.user.send(`Hello dear ${menu.user.username}.`);
                },
                '❌': 'delete'
            }
        },
        {
            name: 'sub-menu',
            content: new MessageEmbed({
                title: 'Reasons',
                description: 'This is another page.',
                fields: [
                    {
                        name: ":one: Persona non grata",
                        value: "El equipo administrativo decidió que el usuario ya no es bienvenido al servidor.",
                        inline: false
                    },
                    {
                        name: ":two: Toxicidad",
                        value: "El usuario presentó/presenta una conducta no permitida dentro del servidor.",
                        inline: false
                    },
                    {
                        name: ":three: Molestar en DM",
                        value: "El usuario ha hostigado/acosado/molestado a usuarios pertenecientes de esta comunidad en los mensajes privados.",
                        inline: false
                    },
                    {
                        name: ":four: Spammear/Pasar Links",
                        value: "El usuario ha enviado links no permitidos dentro del servidor.",
                        inline: false
                    },
                    {
                        name: ":x: Close",
                        value: "Close the menu.",
                        inline: false
                    }
                ]
            }),
            reactions: {
                '⬅️': 'main',
                '1️⃣': async(menu) => {
                  reason = reasons["Persona non grata"];
                  menu.setPage(0)
                  menu.clearReactions()
                  menu.addReactions()
                },
                '2️⃣': async(menu) => {
                  reason = reasons["Toxiquear"];
                  menu.setPage(0)
                  menu.clearReactions()
                  menu.addReactions()
                },
                '3️⃣': async(menu) => {
                  reason = reasons["Molestar en DM"];
                  menu.setPage(0)
                  menu.clearReactions()
                  menu.addReactions()
                },
                '4️⃣': async(menu) => {
                  reason = reasons["Spammear/Pasar links"];
                  menu.setPage(0)
                  menu.clearReactions()
                  menu.addReactions()
                },
                '❌': 'delete'
            }
        }
      ]);
      
      menu.start();
      
      menu.on('page-changing', (oldPageIndex, oldPage, newPageIndex, newPage) => {
        console.log(menu)
        console.log(reason)
        console.log(reasonMsg)
        if(reason == "" || reason == undefined){
          reasonMsg = "Porfavor seleccione una razón para proceder con la sanción."
        } else {
          reasonMsg = reason
        }
        console.log(`Menu is going from "${oldPage.content.title}" (${oldPageIndex}) to "${newPage.content.title}" (${newPageIndex})`);
      });
      
      menu.on('page-changed', (pageIndex, page) => {
        console.log(`Menu is now on "${page.content.title}" (${pageIndex})`);
      });
    } catch (e) {
        console.log(e);
        return message.say('Something went horribly wrong! Please try again later.')
    } 
}
/*
  run(message, { userToBan, reason }) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToBan);
    if (user == undefined)
      return message.channel.send('Please try again with a valid user');
    user
    .send(
      'You were banned from ' +
        message.guild.name +
        ' With the reason: ' +
        reason
    )
      .ban({ reason })
      .then(() => {
        const banEmbed = new MessageEmbed()
          .addField('Banned:', userToBan)
          .addField('Reason', reason)
          .setColor('#420626');
        message.channel.send(banEmbed);
      })

      .catch((e) => {
        message.say(
          'Something went wrong when trying to ban this user, I probably do not have the permission to ban him'
        );
        return console.error(e);
      });
  }*/
};
