module.exports = {
	name: "Member Role Removed MOD",

	isEvent: true,

	fields: ["Temp Variable Name (Stores role object):", "Temp Variable Name (Stores member object):"],

	mod: function(DBM) {
		DBM.events = DBM.events || {};
		DBM.events.roleRemoved = async function(oldMember, newMember) {
			const { Bot, Actions } = DBM;
			const events = Bot.$evts["Member Role Removed MOD"];
			if(!events) return;
			if (newMember.roles.size > oldMember.roles.size) return;
			const server = newMember.guild;
			for (const event of events) {
				const temp = {};

				const oldRoles = oldMember.roles;
				const newRoles = newMember.roles;

				let difference = oldRoles.filter((role) => !newRoles.has(role.id)).first();
				if (event.temp) temp[event.temp] = difference;
				if (event.temp2) temp[event.temp2] = newMember;

				Actions.invokeEvent(event, server, temp);
			}


		};

		const onReady = DBM.Bot.onReady;
		DBM.Bot.onReady = function(...params) {
			DBM.Bot.bot.on("guildMemberUpdate", DBM.events.roleRemoved);
			onReady.apply(this, ...params);
		};
	}
};
