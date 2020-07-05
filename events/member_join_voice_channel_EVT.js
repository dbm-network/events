module.exports = {

  author: 'Almeida',

  name: 'Member Join Voice Channel',

  isEvent: true,

  fields: ['Temp Variable Name (stores member that entered the channel):', 'Temp Variable Name (stores channel that the member joined):'],

  mod (DBM) {
    DBM.events = DBM.events || {}
    const { Actions, Bot } = DBM

    DBM.events.MemberJoinVoiceChannel = function (oldVoiceState, newVoiceState) {
      const oldChannel = oldVoiceState.channel
      const newChannel = newVoiceState.channel
      const server = (oldChannel || newChannel).guild
      if (!(!oldChannel && newChannel)) return
      for (const event of Bot.$evts['Member Join Voice Channel']) {
        const temp = {}

        if (event.temp) temp[event.temp] = newVoiceState.member
        if (event.temp2) temp[event.temp2] = newChannel

        Actions.invokeEvent(event, server, temp)
      }
    }
    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('voiceStateUpdate', DBM.events.MemberJoinVoiceChannel)
      onReady.apply(this, ...params)
    }
  }

}
