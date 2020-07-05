module.exports = {
  name: 'Member Role Removed MOD',

  isEvent: true,

  fields: ['Temp Variable Name (Stores role object):', 'Temp Variable Name (Stores member object):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}
    const { Bot, Actions } = DBM
    DBM.events.roleRemoved = async function (oldMember, newMember) {
      const oldRoles = oldMember.roles
      const newRoles = newMember.roles

      const difference = oldRoles.filter((role) => !newRoles.has(role.id)).first()
      if (newMember.roles.size > oldMember.roles.size) return
      const server = newMember.guild
      Bot.$evts['Member Role Removed MOD'].forEach((event) => {
        const temp = {}

        if (event.temp) temp[event.temp] = difference
        if (event.temp2) temp[event.temp2] = newMember

        Actions.invokeEvent(event, server, temp)
      })
    }

    const onReady = DBM.Bot.onReady
    DBM.Bot.onReady = function (...params) {
      DBM.Bot.bot.on('guildMemberUpdate', DBM.events.roleRemoved)
      onReady.apply(this, ...params)
    }
  }
}
