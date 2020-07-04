module.exports = {

	name: "Message Reaction Removed MOD",

	isEvent: true,

	fields: ["Reaction (Temp Variable Name):", "Member who Reacted (Temp Variable Name):"],

	mod: function(DBM) {
		DBM.events = DBM.events || {};
		DBM.events.reactionRemoved = function(reaction, member) {
			const { Bot, Actions } = DBM;
			const events = Bot.$evts["Message Reaction Removed MOD"];
			if(!events) return;
			const server = reaction.message.guild;
			for (const event of events) {
				const temp = {};
				if(event.temp) temp[event.temp] = reaction;
				if(event.temp2) temp[event.temp2] = server.members.get(member.id);
				Actions.invokeEvent(event, server, temp);
			}
		};
		const onReady = DBM.Bot.onReady;
		DBM.Bot.onReady = function(...params) {
			DBM.Bot.bot.on("messageReactionRemove", DBM.events.reactionRemoved);
			onReady.apply(this, ...params);
		};
	}
};
