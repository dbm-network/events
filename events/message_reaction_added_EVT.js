module.exports = {

  name: 'Message Reaction Added MOD',

  isEvent: true,

  fields: ['Reaction (Temp Variable Name):', 'Member who Reacted (Temp Variable Name):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.reactionAdded = function (reaction, member) {
      const server = reaction.message.guild
      const user = server.members.cache.get(member.id)
      for (const event of Bot.$evts['Message Reaction Added MOD']) {
        const temp = {}

        if (event.temp) temp[event.temp] = reaction
        if (event.temp2) temp[event.temp2] = user

        Actions.invokeEvent(event, server, temp)
      }
    }

    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('messageReactionAdd', DBM.events.reactionAdded)

      onReady.apply(this, ...params)
    }
  }

}
