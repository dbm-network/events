module.exports = {

  name: 'Message Reaction Added MOD',

  isEvent: true,

  fields: ['Reaction (Temp Variable Name):', 'Member who Reacted (Temp Variable Name):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}

    DBM.events.reactionAdded = function (reaction, member) {
      const { Bot, Actions } = DBM

      const server = reaction.message.guild

      Bot.$evts['Message Reaction Added MOD'].forEach((event) => {
        const temp = {}

        if (event.temp) temp[event.temp] = reaction

        if (event.temp2) temp[event.temp2] = server.members.cache.get(member.id)

        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = DBM.Bot.onReady

    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('messageReactionAdd', DBM.events.reactionAdded)

      onReady.apply(this, ...params)
    }
  }

}
