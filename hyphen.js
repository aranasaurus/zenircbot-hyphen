var ZenIRCBot = require('zenircbot-api').ZenIRCBot;
var zen = new ZenIRCBot();
var sub = zen.get_redis_client();
var request = require('request');

sub.subscribe('in');
sub.on('message', function( channel, message ) {
    var msg = JSON.parse(message);
    if (msg.version == 1) {
        if (msg.type == 'privmsg') {
            var match;
            if (match=/^.* a (\w+)[\- ](ass) ([^!.$]+)(.*)$/.exec(msg.data.message)) {
                var responses = [
                    "wow, that *is* a " + match[1] + " ass-" + match[3] + match[4],
                    "dude, you're right, that ass-" + match[3] + " is totally " + match[1] + match[4],
                    "That is a " + match[1] + " ass-" + match[3] + match[4],
                    "I honestly can't believe just how " + match[1] + " that ass-" + match[3] + " is" + match[4]
                ];
                zen.send_privmsg(msg.data.channel, responses[Math.floor(Math.random() * responses.length)]);
            }
        }
    }
});
