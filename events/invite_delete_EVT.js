module.exports = {
  name: 'Invite Delete',

  isEvent: true,

  fields: ['Temp Variable Name (stores invite code that was deleted):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    DBM.events.inviteDelete = function (invite) {
      const { Bot, Actions } = DBM
      const server = invite.guild
      Bot.$evts['Invite Delete'].forEach((event) => {
        const temp = {}
        if (event.temp) temp[event.temp] = invite.code
        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('inviteDelete', DBM.events.inviteDelete)
      onReady.apply(this, ...params)
    }
  }
}
