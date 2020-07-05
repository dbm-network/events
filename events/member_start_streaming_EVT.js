module.exports = {

  name: 'Member Start Streaming',

  isEvent: true,

  fields: ['Temp Variable Name (Store voice channel):', 'Temp Variable Name (Store streaming member object):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    DBM.events.onStream = function (oldVoiceState, newVoiceState) {
      const { Bot, Actions } = DBM

      const oldChannel = oldVoiceState.channel
      const newChannel = newVoiceState.channel
      if ((!oldChannel || !newChannel) || (oldVoiceState.streaming && !newVoiceState.streaming)) return
      const server = (oldChannel || newChannel).guild
      Bot.$evts['Member Start Streaming'].forEach((event) => {
        const temp = {}
        if (event.temp) temp[event.temp] = newChannel
        if (event.temp2) temp[event.temp2] = newVoiceState.member
        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('voiceStateUpdate', DBM.events.onStream)
      onReady.apply(this, ...params)
    }
  }
}
