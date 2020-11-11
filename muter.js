const Discord = require('discord.js');
const auth = require('./auth.json');
const channelToConnect = require('./channel.json')

// Best to know wtf went wrong
process.on('uncaughtException', function(exception) {
    console.log(exception);
});

// Initialize Discord Bot
const bot = new Discord.Client()

let connectedChannel;

bot.login(auth.token)

// When logged in, connect to the channel defined in channel.json 
bot.on('ready', () => {

    console.log('Connected');
    console.log('Logged in as:' + bot.user.username + ' - ' + bot.user.id + '');

    for (const channel of bot.channels.cache) {
        // TODO : Parameterize this shit.
        if (channel[1].type === 'voice' && channel[1].name === channelToConnect.name) {
            connectedChannel = channel[1].id;
            bot.channels.cache.get(connectedChannel).join();
            break;
        }
    }

});

bot.on('error', (error) => {
    console.log(error)
})

bot.on('message', (message) => {

    let channel = message.guild.channels.cache.get(connectedChannel);

    //If channel is null, something really fucked up is going on.
    if (channel == null) {
        message.reply('Something\'s wrong, I don\'t know where I am connected. Exiting ')
        bot.destroy();
    }

    // If the message received is not a command, ignore it cause it's not for me anyways
    if (message.content.substring(0, 1) !== '!') {
        return;
    }
    // message.member.hasPermission
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.reply('Only admins can play with this bot.');
        return;
    }

    const cmd = message.content.split('!')[1];

    switch (cmd) {
        case 'mute':
        case 'm':
            if (message.member.voice.channel) {
                for (const [memberID, member] of channel.members) {
                    member.voice.setMute(true);
                }
            } else {
                message.reply('You need to join a voice channel first!');
            }
            break;
        case 'unmute':
        case 'um':
            if (message.member.voice.channel) {
                for (const [memberID, member] of channel.members) {
                    if (memberID !== bot.user.id) {
                        member.voice.setMute(false);
                    }
                }
            }
            break;
        case 'gtfo':
            message.reply('Getting the fuck out.').then(() => {
                message.guild.voice.connection.disconnect();
                bot.destroy()
            })
            break;
        case 'help':
            message.reply('Supported commands are "!mute" ("!m"), "!unmute" ("!um"), "!gtfo"')
            break;
    }

});