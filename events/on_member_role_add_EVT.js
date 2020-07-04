module.exports = {
	name: "Member Role Added MOD",

	isEvent: true,

	fields: ["Temp Variable Name (Stores role object):", "Temp Variable Name (Stores member object):"],

	mod: function(DBM) {
		DBM.events = DBM.events || {};
		const { Bot, Actions } = DBM;
		DBM.events.roleAdded = async function(oldMember, newMember) {
			const events = Bot.$evts["Member Role Added MOD"];
			if(!events) return;
			if (newMember.roles.size < oldMember.roles.size) return;

			for (const event of events) {
				const temp = {};
				const server = newMember.guild;
				const oldRoles = oldMember.roles;
				const newRoles = newMember.roles;

				let difference = newRoles.filter((role) => !oldRoles.has(role.id)).first();

				if (event.temp) temp[event.temp] = difference;
				if (event.temp2) temp[event.temp2] = newMember;

				Actions.invokeEvent(event, server, temp);
			}


		};

		const onReady = DBM.Bot.onReady;
		Bot.onReady = function(...params) {
			Bot.bot.on("guildMemberUpdate", DBM.events.roleAdded);
			onReady.apply(this, ...params);
		};
	}
};
