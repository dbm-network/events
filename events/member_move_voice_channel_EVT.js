module.exports = {
	author: "Almeida",

	name: "Member Move Voice Channel",

	isEvent: true,

	fields: [
		"Temp Variable Name (stores member that entered the channel):",
		"Temp Variable Name (stores channel that the member joined):",
	],

	mod(DBM) {
		DBM.events = DBM.events || {};
		const { Actions, Bot } = DBM;
		DBM.events.MemberMoveVoiceChannel = function(oldVoiceState, newVoiceState) {
			const events = Bot.$evts["Member Move Voice Channel"];
			if (!events) return;

			for (const event of events) {
				const temp = {};

				const oldChannel = oldVoiceState.channel;
				const newChannel = newVoiceState.channel;
				const server = (oldChannel || newChannel).guild;

				if (event.temp) temp[event.temp] = newVoiceState.member;
				if (event.temp2) temp[event.temp2] = newChannel;

				if (!(oldChannel && !newChannel) && !(!oldChannel && newChannel) && oldChannel != newChannel) {
					Actions.invokeEvent(event, server, temp);
				} else {
					return;
				}
			}
		};

		const onReady = Bot.onReady;
		Bot.onReady = function(...params) {
			Bot.bot.on("voiceStateUpdate", DBM.events.MemberMoveVoiceChannel);
			onReady.apply(this, ...params);
		};
	},
};
