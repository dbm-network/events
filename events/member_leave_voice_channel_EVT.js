module.exports = {

  author: 'Almeida',

  name: 'Member Leave Voice Channel',

  isEvent: true,

  fields: ['Temp Variable Name (Stores member that entered the channel):', 'Temp Variable Name (Stores channel that the member left):'],

  mod (DBM) {
    DBM.Events = DBM.Events || {}
    const { Actions, Bot } = DBM

    DBM.Events.MemberLeaveVoiceChannel = function (oldVoiceState, newVoiceState) {
      const oldChannel = oldVoiceState.channel
      const newChannel = newVoiceState.channel
      const server = (oldChannel || newChannel).guild
      if (!(oldChannel && !newChannel)) return
      if (!Bot.$evts['Member Leave Voice Channel']) return
      for (const event of Bot.$evts['Member Leave Voice Channel']) {
        const temp = {}

        if (event.temp) temp[event.temp] = oldVoiceState.member
        if (event.temp2) temp[event.temp2] = oldChannel

        Actions.invokeEvent(event, server, temp)
      }
    }
    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('voiceStateUpdate', DBM.Events.MemberLeaveVoiceChannel)
      onReady.apply(this, ...params)
    }
  }

}
