module.exports = {

  name: 'Member Stop Streaming',

  isEvent: true,

  fields: ['Temp Variable Name (Store voice channel):', 'Temp Variable Name (Store streaming member object):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    DBM.events.offStream = function (oldVoiceState, newVoiceState) {
      const { Bot, Actions } = DBM

      const oldChannel = oldVoiceState.channel
      const newChannel = newVoiceState.channel
      if ((!oldChannel || !oldVoiceState.streaming) || (newChannel && newVoiceState.streaming)) return
      const server = (oldChannel || newChannel).guild
      const events = Bot.$evts['Member Stop Streaming'].forEach((event) => {
        for (const event of events) {
          const temp = {}
          if (event.temp) temp[event.temp] = oldChannel
          if (event.temp2) temp[event.temp2] = oldVoiceState.member
          Actions.invokeEvent(event, server, temp)
        }
      })
    }

    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('voiceStateUpdate', DBM.events.offStream)
      onReady.apply(this, ...params)
    }
  }
}
