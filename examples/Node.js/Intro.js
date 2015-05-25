/* global __dirname, exports */
'use strict';
var paper = require('paper');
var TWEEN = require('tween.js');

var center = paper.view.center;
var topscreen = paper.view.center.add(0, 64);

var logo = new paper.Raster({
    source: '/home/fred/rpi/paper.js/examples/raadioMenu/logo_raadio_BN.png',
    position: topscreen
});

exports.intro = function (callback) {
    var animDuration = 3000; //ms
    var fps = 20;
    var nbFrames = animDuration * fps / 1000;
    var keys = [];
    for (var i = 1; i <= nbFrames; i++) {
        keys.push(i * animDuration / nbFrames);
    }
    var currentKeyIndex = 0;

    new TWEEN.Tween({y: topscreen.y})
            .to({y: center.y}, animDuration)
            .onUpdate(function () {
                logo.position.y = this.y;
            })
            .easing(TWEEN.Easing.Bounce.Out)
            .start(0);

    paper.view.onFrame = function (event) {
        TWEEN.update(keys[currentKeyIndex]);
    };

    paper.view.exportFrames({
        amount: nbFrames,
        directory: __dirname,
        onComplete: function () {
            console.log('Done exporting.');
//            paper.project.activeLayer.removeChildren();
            callback(undefined, 'ok');
        },
        onProgress: function (event) {
            currentKeyIndex++;
            console.log(event.percentage + '% complete, frame took: ' + event.delta);
        }
    });
};
