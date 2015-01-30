(function( global ){
    'use strict';

    var Item = _inherit( Basic, {
        _type: 'Item',
        _namespace: 'Items',

        activate : function (){}
    } );

    global.Items = {
        Item : Item
    };

    // mixin( K.prototype, [ Item ], {
    //     // 
    //     activate : function( activator ){
    //         world.player.die();
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
