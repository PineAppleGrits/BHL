const helpers = {};

helpers.askUser = async (message, question, time) => {
    let filter = m => m.author.id === message.author.id
    message.channel.send(question).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: time,
          errors: ['time']
        })
        .then(message => {
          return message;
        })
        .catch(collected => {
            message.channel.send('Timeout');
        });
    })
}

module.exports = helpers;