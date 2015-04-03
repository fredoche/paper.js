var paper = require('paper');
paper.setup(new paper.Canvas(128, 64));

var layer = paper.project.activeLayer;

var TWEEN = require('tween.js');

var animDuration = 2000; //ms
var fps = 20;

var nbFrames = animDuration * fps / 1000;

var keys = [];

for (var i = 0; i < nbFrames; i++) {
    keys.push(i * animDuration / nbFrames);
}

console.log(keys)

var currentKeyIndex = 0;

initialize();

function initialize() {

    var center = paper.view.center;
    var offscreen = paper.view.center.add(128, 0)

    var nova = new paper.Raster({
        source: '/root/rpi/paper.js/examples/raadioMenu/nova.png',
        position: offscreen
    });

    var inter = new paper.Raster({
        source: '/root/rpi/paper.js/examples/raadioMenu/inter.png',
        position: offscreen //off-screen but loaded
    });

    new TWEEN.Tween({x: center.x})
            .to({x: offscreen.x}, animDuration)
            .onUpdate(function () {
                nova.position.x = this.x
            })
            .easing(TWEEN.Easing.Exponential.InOut)
            .start(0)

    new TWEEN.Tween({x: offscreen.x})
            .to({x: center.x}, animDuration)
            .onUpdate(function () {
                inter.position.x = this.x
            })
            .easing(TWEEN.Easing.Exponential.InOut)
            .start(0)

//    new TWEEN.Tween({x: center.x})
//            .to({x: offscreen.x}, animDuration)
//            .onUpdate(function () {
//                inter.position.x = this.x
//            })
//            .easing(TWEEN.Easing.Exponential.InOut)
//            .start(animDuration / 2)
//
//    new TWEEN.Tween({x: offscreen.x})
//            .to({x: center.x}, animDuration)
//            .onUpdate(function () {
//                nova.position.x = this.x
//            })
//            .easing(TWEEN.Easing.Exponential.InOut)
//            .start(animDuration / 2)
}

paper.view.onFrame = function (event) {
    console.log(keys[currentKeyIndex])
    TWEEN.update(keys[currentKeyIndex]);
};

paper.view.exportFrames({
    amount: nbFrames,
    directory: __dirname,
    onComplete: function () {
        console.log('Done exporting.');
    },
    onProgress: function (event) {
        currentKeyIndex++;
        console.log(event.percentage + '% complete, frame took: ' + event.delta);
    }
});
