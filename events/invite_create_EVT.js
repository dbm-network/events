module.exports = {
  name: 'Invite Create',

  isEvent: true,

  fields: ['Temp Variable Name (stores invite code):', 'Temp Variable Name (stores creator of invite):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    DBM.events.inviteCreate = function (invite) {
      const { Bot, Actions } = DBM
      const server = invite.guild
      Bot.$evts['Invite Create'].forEach((event) => {
        const temp = {}
        if (event.temp) temp[event.temp] = invite.code
        if (event.temp2) temp[event.temp2] = invite.inviter
        Actions.invokeEvent(event, server, temp)
      })
    }
    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('inviteCreate', DBM.events.inviteCreate)
      onReady.apply(this, ...params)
    }
  }
}
