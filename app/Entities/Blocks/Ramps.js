'use strict';

var common = require('../../common.js'),
    Block = require('./Block.js');

class Ramp extends Block { }

module.exports = {
    Ramp : Ramp,
    RampEast : common._inherit( Ramp, {
        _type : 'RampEast',
        img : 'Ramp East.png',
        rampDirection : [ 1, 0 ]
    } ),
    RampNorth : common._inherit( Ramp, {
        _type : 'RampNorth',
        img : 'Ramp North.png',
        rampDirection : [ 0, -1 ]
    } ),
    RampSouth : common._inherit( Ramp, {
        _type : 'RampSouth',
        img : 'Ramp South.png',
        rampDirection : [ 0, 1 ]
    } ),
    RampWest : common._inherit( Ramp, {
        _type : 'RampWest',
        img : 'Ramp West.png',
        rampDirection : [ -1, 0 ]
    } ),
};

