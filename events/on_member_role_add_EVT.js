module.exports = {

  name: 'Member Role Added MOD',

  isEvent: true,

  fields: ['Temp Variable Name (Stores role object):', 'Temp Variable Name (Stores member object):'],

  mod: function (DBM) {
    DBM.events = DBM.events || {}

    const { Bot, Actions } = DBM

    DBM.events.roleAdded = async function (oldMember, newMember) {
      if (newMember.roles.size < oldMember.roles.size) return
      const server = newMember.guild

      const oldRoles = oldMember.roles
      const newRoles = newMember.roles
      const difference = newRoles.filter((role) => !oldRoles.has(role.id)).first()

      for (const event of Bot.$evts['Member Role Added MOD']) {
        const temp = {}

        if (event.temp) temp[event.temp] = difference
        if (event.temp2) temp[event.temp2] = newMember

        Actions.invokeEvent(event, server, temp)
      }
    }

    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('guildMemberUpdate', DBM.events.roleAdded)

      onReady.apply(this, ...params)
    }
  }

}
