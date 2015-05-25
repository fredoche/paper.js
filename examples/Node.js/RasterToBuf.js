/* global __dirname, exports */

var paper = require('paper');
var TWEEN = require('tween.js');

paper.setup(new paper.Canvas(128, 64));

var center = paper.view.center;

renderRasters = function (callback) {
    var animDuration = 3000; //ms
    var fps = 21;
    var nbFrames = animDuration * fps / 1000;

    /**
     * bizarrement la frame-00 est blanche, on décale tout pour garder les 
     * mm indices que sur la sequence de départ, et on remet la frame 0 à l'index 
     * nbframe+1
     * @type Number
     */

    var currentFrameIndex = 1;

    paper.view.onFrame = function (event) {
        console.log("onframe " + currentFrameIndex)

        var index = ("00" + currentFrameIndex % nbFrames).slice(-2);
        new paper.Raster({
            source: '/home/fred/Images/frames/' + index + '.png',
            position: center
        });
    };

    paper.view.exportFrames({
        amount: nbFrames + 1,
        directory: __dirname,
        onComplete: function () {
            console.log('Done exporting.');
            callback();
        },
        onProgress: function (event) {
            currentFrameIndex++;
            console.log(event.percentage + '% complete, frame took: ' + event.delta);
        }
    });
};


renderRasters(function () {
    console.log("fini")
})