(function( global ){
    'use strict';

    var K = function Key( ){
    };

    _.extend(K.prototype, {
        sprite : 'Key.png',
    });

    var Item = {
        activate : function (){}
    };

    mixin( K.prototype, [ Item ], {
        // 
        activate : function( activator ){
            world.player.die();
        }
    });

    function mixin( o, mixins, implementation ){
        var m = _.extend.apply( _, [{}].concat( mixins ) );
        var t = Object.keys( m );
        if (!_.isEqual( t, Object.keys(implementation)))
            console.warn( 'not fully implemented' );

        return _.extend( o, implementation );
    }

    global.Key = K;

})( this );

