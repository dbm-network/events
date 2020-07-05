module.exports = {

  name: 'Delete Bulk Messages',

  isEvent: true,

  fields: ['Temp Variable Name (stores list of messages):', 'Temp Variable Name (stores amount of messages):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    DBM.events.messageDeleteBulk = function (messagesList) {
      const { Bot, Actions } = DBM
      const server = messagesList.first().guild
      Bot.$evts['Delete Bulk Messages'].forEach((event) => {
        const temp = {}
        if (event.temp) temp[event.temp] = messagesList.array()
        if (event.temp2) temp[event.temp2] = messagesList.size
        Actions.invokeEvent(event, server, temp)
      })
    }
    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('messageDeleteBulk', DBM.events.messageDeleteBulk)
      onReady.apply(this, ...params)
    }
  }
}
