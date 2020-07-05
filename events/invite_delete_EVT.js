module.exports = {
  name: 'Invite Delete',

  isEvent: true,

  fields: ['Temp Variable Name (Stores invite code that was deleted):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.inviteDelete = function (invite) {
      const server = invite.guild
      for (const event of Bot.$evts['Invite Delete']) {
        const temp = {}
        if (event.temp) temp[event.temp] = invite.code
        Actions.invokeEvent(event, server, temp)
      }
    }
    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('inviteDelete', DBM.events.inviteDelete)
      onReady.apply(this, ...params)
    }
  }
}
