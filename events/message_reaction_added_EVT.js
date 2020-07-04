module.exports = {

	name: "Message Reaction Added MOD",

	isEvent: true,

	fields: ["Reaction", "Member who Reacted"],

	mod: function(DBM) {
		DBM.events = DBM.events || {};
		DBM.events.reactionAdded = function(reaction, member) {
			const { Bot, Actions } = DBM;
			const events = Bot.$evts["Message Reaction Added MOD"];
			if(!events) return;
			const server = reaction.message.guild;
			for (const event of events) {
				const temp = {};
				if(event.temp) temp[event.temp] = reaction;
				if(event.temp2) temp[event.temp2] = member;
				if(event.temp2) temp[event.temp2] = server.members.get(member.id);
				Actions.invokeEvent(event, server, temp);
			}
		};
		const onReady = DBM.Bot.onReady;
		DBM.Bot.onReady = function(...params) {
			DBM.Bot.bot.on("messageReactionAdd", DBM.events.reactionAdded);
			onReady.apply(this, ...params);
		};
	}
};
