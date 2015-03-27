var paper = require('paper');
var scope = require('./Tadpoles.pjs')(new paper.Size(128, 64));

scope.view.exportFrames({
    amount: 1000,
    directory: __dirname,
    onComplete: function() {
        console.log('Done exporting.');
    },
    onProgress: function(event) {
        console.log(event.percentage + '% complete, frame took: ' + event.delta);
    }
});
