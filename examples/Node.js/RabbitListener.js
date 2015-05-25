/* global process, require */
'use strict';
var Promise = require('bluebird');
var paper = require('paper');
paper.setup(new paper.Canvas(128, 64));

var changeRadio = Promise.promisify(require('./RaadioMenu').changeRadio);
var intro = require('./Intro').intro;

var amqp = require('amqplib');

var channel;

console.log(require('./Intro').intro)

intro(function () {
    amqp.connect('amqp://guest1:guest1@192.168.1.13')
            .then(function (conn) {
                process.once('SIGINT', function () {
                    conn.close();
                });
                return conn.createChannel();
            })
            .then(function (ch) {
                channel = ch;
                return ch.assertQueue('menu', {durable: false, autoDelete: false});
            })
            .then(function (_qok) {
                var currentStation = 'inter';
                return channel.consume('menu', function (msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                    console.log(currentStation);
                    console.log(msg.content.toString());
                    changeRadio(currentStation, msg.content.toString())
                            .then(function () {
                                console.log('ecran changé');
                            });
                    currentStation = msg.content.toString();

                }, {noAck: true});
            })
            .then(function (_consumeOk) {
                console.log(' [*] Waiting for messages. To exit press CTRL+C');
            });
});


