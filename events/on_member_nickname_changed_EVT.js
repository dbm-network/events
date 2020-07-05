module.exports = {
  name: 'Member Nickname Changed MOD',

  isEvent: true,

  fields: ['Temp Variable Name (Stores new nickname):', 'Temp Variable Name (Stores member object):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.nicknameChanged = async function (oldMember, newMember) {
      if (newMember.nickname === oldMember.nickname) return
      const server = newMember.guild
      Bot.$evts['Member Nickname Changed MOD'].forEach((event) => {
        const temp = {}
        if (event.temp) temp[event.temp] = newMember.nickname
        if (event.temp2) temp[event.temp2] = newMember
        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('guildMemberUpdate', DBM.events.nicknameChanged)
      onReady.apply(this, ...params)
    }
  }
}
