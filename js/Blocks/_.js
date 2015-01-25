( function( global ){

    var b = {
        Block : Block
    };

    function Block (){

    }

    b.Stone = _inherit( Block, { img: 'Stone Block.png' } );
    b.Water = _inherit( Block, { img: 'Water Block.png' } );
    b.Grass = _inherit( Block, { img: 'Grass Block.png' } );

    function _inherit ( P, proto ){
        var N = function N(){
            P.apply( this, arguments );
        };
        N.prototype = Object.create( P.prototype );
        N.prototype.constructor = N;
        _.extend(N.prototype, proto );
        return N;
    }

    global.Block = b;

} )( this );
