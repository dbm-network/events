module.exports = {
	name: "Member Nickname Changed MOD",

	isEvent: true,

	fields: ["Temp Variable Name (stores new nickname):", "Temp Variable Name (stores member object):"],

	mod: function(DBM) {
		DBM.events = DBM.events || {};
		const { Bot, Actions } = DBM;
		DBM.events.nicknameChanged = async function(oldMember, newMember) {
			const events = Bot.$evts["Member Nickname Changed MOD"];
			if(!events) return;
			if (newMember.nickname === oldMember.nickname) return;
			const server = newMember.guild;
			for (const event of events) {
				const temp = {};
				if (event.temp) temp[event.temp] = newMember.nickname;
				if (event.temp2) temp[event.temp2] = newMember;
				Actions.invokeEvent(event, server, temp);
			}
		};

		const onReady = DBM.Bot.onReady;
		Bot.onReady = function(...params) {
			Bot.bot.on("guildMemberUpdate", DBM.events.nicknameChanged);
			onReady.apply(this, ...params);
		};
	}
};
