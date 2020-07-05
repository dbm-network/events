module.exports = {

  author: 'Almeida',

  name: 'Member Leave Voice Channel',

  isEvent: true,

  fields: ['Temp Variable Name (stores member that entered the channel):', 'Temp Variable Name (stores channel that the member left):'],

  mod (DBM) {
    DBM.events = DBM.events || {}

    const { Actions, Bot } = DBM

    DBM.events.MemberLeaveVoiceChannel = function (oldVoiceState, newVoiceState) {
      const oldChannel = oldVoiceState.channel
      const newChannel = newVoiceState.channel
      const server = (oldChannel || newChannel).guild
      Bot.$evts['Member Leave Voice Channel'].forEach((event) => {
        const temp = {}

        if (event.temp) temp[event.temp] = oldVoiceState.member
        if (event.temp2) temp[event.temp2] = oldChannel

        if (oldChannel && !newChannel) Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = DBM.Bot.onReady

    Bot.onReady = function (...params) {
      Bot.bot.on('voiceStateUpdate', DBM.events.MemberLeaveVoiceChannel)

      onReady.apply(this, ...params)
    }
  }

}
