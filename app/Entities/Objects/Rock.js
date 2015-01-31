define([ 'common', 'Entities/Objects/BasicObject' ], function( common, BasicObject ){
    'use strict';

    return  common._inherit( BasicObject, {
        img: 'Rock.png',
        _type: 'Rock'
    } )
} );
