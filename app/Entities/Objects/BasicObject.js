define( [ 'common', 'Entities/Basic' ], function ( common, Basic ) {
    'use strict';

    return common._inherit( Basic, {
        _namespace: 'Objects',
        _type: 'BasicObject'
    } );
} )
