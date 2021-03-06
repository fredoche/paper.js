/* global process */
var dbus = require('dbus-native');

var stations = {
    nova: 'http://broadcast.infomaniak.net/radionova-high.mp3',
    fip: 'http://www.tv-radio.com/station/fip_mp3/fip_mp3-128k.m3u',
    inter: 'http://www.tv-radio.com/station/france_inter_mp3/france_inter_mp3-128k.m3u',
    radiomeuh: 'http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3',
    ouifm: 'http://ouifm.ice.infomaniak.ch/ouifm-high.mp3'
};

var amqp = require('amqplib');
amqp.connect('amqp://guest1:guest1@192.168.1.13').then(function (conn) {
    var sessionBus = dbus.sessionBus();
    process.once('SIGINT', function () {
        conn.close();
    });

    return conn.createChannel().then(function (ch) {
        function doWithQueue(queue, callback) {
            var ok = ch.assertQueue(queue, {durable: false, autoDelete: true});
            ok = ok.then(function (_qok) {
                return ch.consume(queue, function (msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                    console.log(msg.content.toString());
                    sessionBus
                            .getService('com.intel.dleyna-renderer')
                            .getInterface(
                                    process.env.ENDPOINT,
                                    'org.mpris.MediaPlayer2.Player',
                                    function (err, player) {
                                        callback(player, msg)
                                    }
                            );
                }, {noAck: true});
            });
            return ok.then(function (_consumeOk) {
                console.log(
                        ' [*] Waiting for messages from queue '
                        + queue
                        + ' . To exit press CTRL+C');
            });
        }

        doWithQueue('station', function (player, msg) {
            player.OpenUri(stations[msg.content.toString()]);
        });

        doWithQueue('playPause', function (player, msg) {
            player.PlayPause();
        });


    });
});