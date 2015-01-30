(function( global ){
    'use strict';

    var Tellyport = _inherit( Items.Item, {} );

    var types = {
        '0' : 'Gem Blue.png',
        '1' : 'Gem Green.png',
        '2' : 'Gem Orange.png'
    };

    Object.keys( types ).forEach( function ( key ){
        global.Items[ 'Tellyport' + key ] = _inherit( Tellyport, {
            img: types[ key ],
            _type : 'Tellyport' + key
        } );
        console.log('Tellyport' + key);
    } );


    // mixin( T.prototype, [ Item ], {
    //     // 
    //     activate : function( activator ){
    //         var self = this;
    //         var target = world.findItem( T, function( t ){
    //             return t != self && t.type == self.type;
    //         } );

    //         world.tellyportTo( self, target, activator );
    //     }
    // });

    // function mixin( o, mixins, implementation ){
    //     var m = _.extend.apply( _, [{}].concat( mixins ) );
    //     var t = Object.keys( m );
    //     if (!_.isEqual( t, Object.keys(implementation)))
    //         console.warn( 'not fully implemented' );

    //     return _.extend( o, implementation );
    // }

})( this );
