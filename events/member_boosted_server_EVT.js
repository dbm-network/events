module.exports = {

	name: "Member Boosted Server",

	isEvent: true,

	fields: ["Member", "Guild"],

	mod: function(DBM) {
		DBM.events = DBM.events || {};

		DBM.events.boostedGuild = function(old, recent) {
			const { Bot, Actions } = DBM;

			const events = Bot.$evts["Member Boosted Server"];
			if(!events) return;

			if (!old.premiumSince && recent.premiumSince) {
				for (const event of events) {
					const temp = {};
					if(event.temp) temp[event.temp] = recent;
					if(event.temp2) temp[event.temp2] = recent.guild;

					const server = null;

					Actions.invokeEvent(event, server, temp);
				}
			}


		};

		const onReady = DBM.Bot.onReady;
		DBM.Bot.onReady = function(...params) {
			DBM.Bot.bot.on("guildMemberUpdate", DBM.events.boostedGuild);
			onReady.apply(this, ...params);
		};
	}
};
