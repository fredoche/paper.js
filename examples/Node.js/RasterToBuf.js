/* global __dirname, exports */

var paper = require('paper');
var TWEEN = require('tween.js');

paper.setup(new paper.Canvas(128, 64));

var center = paper.view.center;

renderRasters = function (callback) {
    var animDuration = 3000; //ms
    var fps = 21;
    var nbFrames = animDuration * fps / 1000;
    var keys = [];
    for (var i = 1; i <= nbFrames; i++) {
        keys.push(i * animDuration / nbFrames);
    }
    var currentKeyIndex = 0;
    
    paper.view.onFrame = function (event) {
        paper.project.activeLayer.removeChildren();
        
        var index = ("00" + currentKeyIndex).slice(-2);
        new paper.Raster({
            source: '/home/fred/Images/frames/' + index + '.png',
            position: center
        })
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


renderRasters(function(){
    console.log("fini")
})