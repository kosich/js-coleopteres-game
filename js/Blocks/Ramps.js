(function(global){

    var Ramp = _inherit( Blocks.Block, {

    } );

    _.extend( Blocks, {
        Ramp : Ramp,
        RampEast : _inherit( Ramp, {
            _type : 'RampEast',
            img : 'Ramp East.png',
            rampDirection : [ 0, 1 ]
        } ),
        RampNorth : _inherit( Ramp, {
            _type : 'RampNorth',
            img : 'Ramp North.png',
            rampDirection : [ 0, 1 ]
        } ),
        RampSouth : _inherit( Ramp, {
            _type : 'RampSouth',
            img : 'Ramp South.png',
            rampDirection : [ 0, 1 ]
        } ),
        RampWest : _inherit( Ramp, {
            _type : 'RampWest',
            img : 'Ramp West.png',
            rampDirection : [ 0, 1 ]
        } ),
    } );

})(this);
