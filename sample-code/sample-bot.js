const Discordie = require('discordie');
const Events = Discordie.Events;
const discordClient = new Discordie();
const BOT_TOKEN = 'your_token_here';

discordClient.connect({
  token: BOT_TOKEN,
});

discordClient.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log(discordClient.User.username + ' connected!');
});

discordClient.Dispatcher.on(Events.MESSAGE_CREATE, ({message}) => {
  messag.channel.sendMessage('You are awesome!');
});
