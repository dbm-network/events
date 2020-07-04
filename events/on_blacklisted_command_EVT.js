module.exports = {
	name: "On Blacklisted Command",
	isEvent: true,
	fields: ["User Who Used Command", "Command Message"],
	mod: function(DBM) {
		DBM.events = DBM.events || {};
		DBM.events.blacklistedUserUse = function(user, message) {
			const { Bot, Actions } = DBM;
			const events = Bot.$evts["On Blacklisted Command"];
			if (!events) return;
			for (const event of events) {
				const temp = {};
				if(event.temp) temp[event.temp] = user;
				if(event.temp2) temp[event.temp2] = message;
				const server = user.guild || null;
				Actions.invokeEvent(event, server, temp);
			}
		};
		const onReady = DBM.Bot.onReady;
		DBM.Bot.onReady = function(...params) {
			DBM.Bot.bot.on("blacklistUserUse", DBM.events.blacklistedUserUse);
			onReady.apply(this, ...params);
		};
	}
};
