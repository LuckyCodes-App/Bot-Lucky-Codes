const { ActivityType } = require('discord.js');
module.exports = async (client) => {
	client.user.setStatus('online');
	client.user.setActivity('luckycodes.app', { type: ActivityType.Watching });
	console.log('☘️  ' + client.user.username + ' online!');
};