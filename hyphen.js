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
            var regex = /^.*(that|those|it)(?:'?(s|re))? (is|are)? ?(a|an|some) ?\w* (\w+)[\- ](ass) ([^!.$]+)(.*)$/i;
            if (match=regex.exec(msg.data.message)) {
                var demonstrative = match[1],
                    verb = match[2] || match[3],
                    article = match[4],
                    adjective = match[5],
                    ass = match[6],
                    noun = match[7],
                    punctuation = match[8];
                if (verb == "s") {
                    verb = "is";
                } else if (verb == "re") {
                    verb = "are";
                }
                if (demonstrative == "it") {
                    demonstrative = "that";
                }
                var responses = [
                    "wow, " + demonstrative + " *" + verb + "* " + article + " " + adjective + " " + ass + "-" + noun + punctuation,
                    "dude, you're right, " + demonstrative + " " + ass + "-" + noun + " " + verb + " totally " + adjective + punctuation,
                    "yeah " + demonstrative + " " + verb + " " + article + " " + adjective + " " + ass + "-" + noun + punctuation,
                    demonstrative + " really " + verb + " " + article + " " + adjective + " " + ass + "-" + noun + punctuation,
                    "I honestly can't believe just how " + adjective + " " + demonstrative + " " + ass + "-" + noun + " " + verb + punctuation
                ];

                zen.send_privmsg(msg.data.channel, responses[Math.floor(Math.random() * responses.length)]);
            }
        }
    }
});
