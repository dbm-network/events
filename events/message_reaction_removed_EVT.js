module.exports = {

  name: 'Message Reaction Removed MOD',

  isEvent: true,

  fields: ['Reaction (Temp Variable Name):', 'Member who Reacted (Temp Variable Name):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.reactionRemoved = function (reaction, member) {
      const server = reaction.message.guild
      for (const event of Bot.$evts['Message Reaction Removed MOD']) {
        const temp = {}

        if (event.temp) temp[event.temp] = reaction
        if (event.temp2) temp[event.temp2] = server.members.cache.get(member.id)

        Actions.invokeEvent(event, server, temp)
      }
    }
    const onReady = DBM.Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('messageReactionRemove', DBM.events.reactionRemoved)
      onReady.apply(this, ...params)
    }
  }
}
