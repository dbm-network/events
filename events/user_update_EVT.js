module.exports = {
	name: "User Update",
	isEvent: true,
	fields: ["User Before Update (Temp Variable Name):", "User After Update (Temp Variable Name):"],
	mod: function(DBM) {
		DBM.events = DBM.events || {};
		const { Bot, Actions } = DBM;
		DBM.events.callUserUpdate = function(pre, post) {
			const events = Bot.$evts["User Update"];
			if (!events) return;
			for (const event of events) {
				const event = events[i];
				const temp = {};
				if(event.temp) temp[event.temp] = pre;
				if(event.temp2) temp[event.temp2] = post;
				const server = null;
				Actions.invokeEvent(event, server, temp);
			}
		};
		const onReady = DBM.Bot.onReady;
		Bot.onReady = function(...params) {
			Bot.bot.on("userUpdate", DBM.events.callUserUpdate);
			onReady.apply(this, ...params);
		};

	}
};
