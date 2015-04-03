var paper = require('paper');
paper.setup(new paper.Canvas(128, 64));

var RaadioMenu = require('./RaadioMenu');

RaadioMenu.changeRadio('inter', 'nova', function () {
    RaadioMenu.changeRadio('nova', 'inter', function () {
        console.log('here');
    });
});