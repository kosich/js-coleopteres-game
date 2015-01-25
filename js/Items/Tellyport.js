(function( global ){
    'use strict';

    var types = {
        '0' : 'Gem Blue.png',
        '1' : 'Gem Green.png',
        '2' : 'Gem Orange.png'
    };

    var T = function Tellyport( type ){
        this.type = type;
        this.sprite = types[ type ];
    };

    _.extend(T.prototype, {
    });

    var Item = {
        activate : function (){}
    };

    mixin( T.prototype, [ Item ], {
        // 
        activate : function( activator ){
            var self = this;
            var target = world.findItem( T, function( t ){
                return t != self && t.type == self.type;
            } );

            world.tellyportTo( self, target, activator );
        }
    });

    function mixin( o, mixins, implementation ){
        var m = _.extend.apply( _, [{}].concat( mixins ) );
        var t = Object.keys( m );
        if (!_.isEqual( t, Object.keys(implementation)))
            console.warn( 'not fully implemented' );

        return _.extend( o, implementation );
    }

    global.Tellyport = T;

})( this );
