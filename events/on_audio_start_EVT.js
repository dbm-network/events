module.exports = {

  name: 'On Audio Start',

  isEvent: true,

  fields: ['Temp Variable Name (stores voice channel object)'],

  mod: function (DBM) {
    const playItem = DBM.Audio.playItem
    DBM.Audio.playItem = function (item, id) {
      playItem.bind(this)(...arguments)
      if (this.connections[id]) {
        const guild = this.connections[id].channel.guild
        const voiceChannel = this.connections[id].channel
        const dispatcher = this.dispatchers[id]
        const pause = dispatcher.pause
        dispatcher.pause = function () {
          if (!dispatcher.pausedSince) {
            pause.bind(this)(...arguments)
            DBM.Events.onPause(guild, voiceChannel)
          }
        }
        const resume = dispatcher.resume
        dispatcher.resume = function () {
          if (dispatcher.pausedSince) {
            resume.bind(this)(...arguments)
            DBM.Events.onResume(guild, voiceChannel)
          }
        }
        dispatcher.on('volumeChange', function (oldVolume, newVolme) {
          DBM.Events.onVolumeChange(guild, voiceChannel, oldVolume)
        })
        DBM.Events.onStart(guild, voiceChannel)
        dispatcher.on('finish', function () {
          DBM.Events.onEnd(guild, voiceChannel)
        })
      }
    }
    DBM.Events.onStart = function (server, voiceChannel) {
      const { Bot, Actions } = DBM
      const events = Bot.$evts['On Audio Start']
      if (!events) return
      for (let i = 0; i < events.length; i++) {
        const event = events[i]
        const temp = {}
        if (event.temp) temp[event.temp] = voiceChannel
        Actions.invokeEvent(event, server, temp)
      };
    }
  }
}
