module.exports = {

  name: 'Member Boosted Server',

  isEvent: true,

  fields: ['Member (Temp Variable Name):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.boostedGuild = function (old, recent) {
      const server = recent.guild
      if (!(!old.premiumSince && recent.premiumSince)) return
      for (const event of Bot.$evts['Member Boosted Server']) {
        const temp = {}

        if (event.temp) temp[event.temp] = recent
        if (event.temp2) temp[event.temp2] = recent.guild

        Actions.invokeEvent(event, server, temp)
      }
    }

    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('guildMemberUpdate', DBM.events.boostedGuild)
      onReady.apply(this, ...params)
    }
  }
}
