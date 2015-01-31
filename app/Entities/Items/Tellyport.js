define(['exports', 'common', 'Entities/Items/Item'], function ( exports, common, Item ) {
    'use strict';

    var Tellyport = common._inherit( Item, {} );

    var types = {
        '0' : 'Gem Blue.png',
        '1' : 'Gem Green.png',
        '2' : 'Gem Orange.png'
    };

    Object.keys( types ).forEach( function ( key ){
        exports[ 'Tellyport' + key ] = common._inherit( Tellyport, {
            img: types[ key ],
            _type : 'Tellyport' + key
        } );
        console.log('Tellyport' + key);
    } );

});
