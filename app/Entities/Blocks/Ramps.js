define( ['underscore', 'common', './Block'], function( _, common, Block ){
    'use strict';

    var Ramp = common._inherit( Block, { } );

    return {
        Ramp : Ramp,
        RampEast : common._inherit( Ramp, {
            _type : 'RampEast',
            img : 'Ramp East.png',
            rampDirection : [ 0, 1 ]
        } ),
        RampNorth : common._inherit( Ramp, {
            _type : 'RampNorth',
            img : 'Ramp North.png',
            rampDirection : [ 0, 1 ]
        } ),
        RampSouth : common._inherit( Ramp, {
            _type : 'RampSouth',
            img : 'Ramp South.png',
            rampDirection : [ 0, 1 ]
        } ),
        RampWest : common._inherit( Ramp, {
            _type : 'RampWest',
            img : 'Ramp West.png',
            rampDirection : [ 0, 1 ]
        } ),
    };

});
