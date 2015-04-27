var paper = require('paper');
paper.setup(new paper.Canvas(128, 64));

var RaadioMenu = require('./RaadioMenu');

var amqp = require('amqplib');
amqp.connect('amqp://guest1:guest1@192.168.1.13').then(function (conn) {
    process.once('SIGINT', function () {
        conn.close();
    });
    return conn.createChannel().then(function (ch) {

        var ok = ch.assertQueue('menu', {durable: false, autoDelete: true});

        var currentStation = 'inter';

        ok = ok.then(function (_qok) {
            return ch.consume('menu', function (msg) {
                console.log(" [x] Received '%s'", msg.content.toString());
                console.log(currentStation)
                console.log(msg.content.toString())
                RaadioMenu.changeRadio(currentStation, msg.content.toString(), function () {
                    console.log('ecran changé');
                });
                currentStation = msg.content.toString();

            }, {noAck: true});
        });

        return ok.then(function (_consumeOk) {
            console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
    });
});