/* global __dirname, exports */

var paper = require('paper');
var TWEEN = require('tween.js');

var center = paper.view.center;
var offscreen = paper.view.center.add(128, 0);

var icons = {
    nova: new paper.Raster({
        source: __dirname + '/../raadioMenu/nova.png',
        position: offscreen
    }),
    fip: new paper.Raster({
        source: '/home/fred/rpi/paper.js/examples/raadioMenu/inter.png',
        position: offscreen //off-screen but loaded
    }),
    inter: new paper.Raster({
        source: __dirname + '/../raadioMenu/inter.png',
        position: offscreen //off-screen but loaded
    }),
    radiomeuh: new paper.Raster({
        source: '/home/fred/rpi/paper.js/examples/raadioMenu/inter.png',
        position: offscreen //off-screen but loaded
    }),
    ouifm: new paper.Raster({
        source: '/home/fred/rpi/paper.js/examples/raadioMenu/inter.png',
        position: offscreen //off-screen but loaded
    })
};

exports.changeRadio = function (from, to, callback) {
    var animDuration = 2000; //ms
    var fps = 20;
    var nbFrames = animDuration * fps / 1000;
    var keys = [];
    for (var i = 1; i <= nbFrames; i++) {
        keys.push(i * animDuration / nbFrames);
    }
    var currentKeyIndex = 0;

    var from = icons[from];
    var to = icons[to];

    from.position = center;
    to.position = offscreen;

    new TWEEN.Tween({x: center.x})
            .to({x: offscreen.x}, animDuration)
            .onUpdate(function () {
                from.position.x = this.x;
            })
            .easing(TWEEN.Easing.Exponential.InOut)
            .start(0);

    new TWEEN.Tween({x: offscreen.x})
            .to({x: center.x}, animDuration)
            .onUpdate(function () {
                to.position.x = this.x;
            })
            .easing(TWEEN.Easing.Exponential.InOut)
            .start(0);

    paper.view.onFrame = function (event) {
        TWEEN.update(keys[currentKeyIndex]);
    };

    paper.view.exportFrames({
        amount: nbFrames,
        directory: __dirname,
        onComplete: function () {
            console.log('Done exporting.');
            callback();
        },
        onProgress: function (event) {
            currentKeyIndex++;
            console.log(event.percentage + '% complete, frame took: ' + event.delta);
        }
    });
};
