module.exports = {

  name: 'On Blacklisted Command',

  isEvent: true,

  fields: ['User Who Used Command', 'Command Message'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.blacklistedUserUse = function (user, message) {
      const server = user.guild || null
      Bot.$evts['On Blacklisted Command'].forEach((event) => {
        const temp = {}

        if (event.temp) temp[event.temp] = user
        if (event.temp2) temp[event.temp2] = message

        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('blacklistUserUse', DBM.events.blacklistedUserUse)

      onReady.apply(this, ...params)
    }
  }

}
