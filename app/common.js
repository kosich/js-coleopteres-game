define(['underscore'], function( _ ){
    'use strict';

    ///{{{ just usual inherit sugar
    function _inherit ( P, proto, meta ){
        if ( !P )
            console.error('inherriting', proto, ' from undefined ', P);

        var N = function N(){
            P.apply( this, arguments );
            if ( meta && meta.init ){
                meta.init.apply( this, arguments );
            }
        };
        N.prototype = Object.create( P.prototype );
        // N.prototype.constructor = N;
        Object.defineProperty( N.prototype, 'constructor', {
            value : N,
            enumerable : false
        } );
        _.extend(N.prototype, proto );
        return N;
    }
    //}}}

    return {
        _inherit : _inherit
    };
});
