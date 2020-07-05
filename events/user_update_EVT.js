module.exports = {
  name: 'User Update',
  isEvent: true,
  fields: ['User Before Update (Temp Variable Name):', 'User After Update (Temp Variable Name):'],
  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.callUserUpdate = function (pre, post) {
      Bot.$evts['User Update'].forEach((event) => {
        const temp = {}
        if (event.temp) temp[event.temp] = pre
        if (event.temp2) temp[event.temp2] = post

        Actions.invokeEvent(event, null, temp)
      })
    }
    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('userUpdate', DBM.events.callUserUpdate)
      onReady.apply(this, ...params)
    }
  }
}
