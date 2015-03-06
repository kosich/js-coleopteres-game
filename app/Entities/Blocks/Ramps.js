'use strict';

var common = require('../../common.js'),
    Block = require('./Block.js');

class Ramp extends Block { }

// module.exports = {
//     Ramp : Ramp,
//     RampEast : common._inherit( Ramp, {
//         _type : 'RampEast',
//         img : 'Ramp East.png',
//         rampDirection : [ 0, 1 ]
//     } ),
//     RampNorth : common._inherit( Ramp, {
//         _type : 'RampNorth',
//         img : 'Ramp North.png',
//         rampDirection : [ 0, 1 ]
//     } ),
//     RampSouth : common._inherit( Ramp, {
//         _type : 'RampSouth',
//         img : 'Ramp South.png',
//         rampDirection : [ 0, 1 ]
//     } ),
//     RampWest : common._inherit( Ramp, {
//         _type : 'RampWest',
//         img : 'Ramp West.png',
//         rampDirection : [ 0, 1 ]
//     } ),
// };

module.exports = {
    Ramp : Ramp,
    RampEast  : class RampEast extends Ramp {
        _type : 'RampEast'
        img : 'Ramp East.png'
        rampDirection : [ 0, 1 ]
    },
    RampNorth : class RampNorth extends Ramp {
        _type : 'RampNorth'
        img : 'Ramp North.png'
        rampDirection : [ 0, 1 ]
    },
    RampSouth : class RampSouth extends Ramp {
        _type : 'RampSouth'
        img : 'Ramp South.png'
        rampDirection : [ 0, 1 ]
    },
    RampWest  : class RampWest  extends Ramp {
        _type : 'RampWest'
        img : 'Ramp West.png'
        rampDirection : [ 0, 1 ]
    }
};
