module.exports = {
  author: 'Almeida',

  name: 'Member Move Voice Channel',

  isEvent: true,

  fields: ['Temp Variable Name (Stores member that entered the channel):', 'Temp Variable Name (Stores channel that the member joined):'],

  mod (DBM) {
    DBM.events = DBM.events || {}
    const { Actions, Bot } = DBM
    DBM.events.MemberMoveVoiceChannel = function (oldVoiceState, newVoiceState) {
      const oldChannel = oldVoiceState.channel
      const newChannel = newVoiceState.channel
      const server = (oldChannel || newChannel).guild
      if (!(!(oldChannel && !newChannel) && !(!oldChannel && newChannel) && oldChannel !== newChannel)) return
      Bot.$evts['Member Move Voice Channel'].forEach((event) => {
        const temp = {}

        if (event.temp) temp[event.temp] = newVoiceState.member
        if (event.temp2) temp[event.temp2] = newChannel

        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('voiceStateUpdate', DBM.events.MemberMoveVoiceChannel)
      onReady.apply(this, ...params)
    }
  }
}
