define(['common', 'Entities/Basic'], function ( common, Basic ) {
    'use strict';

    var Item = common._inherit( Basic, {
        _type: 'Item',
        _namespace: 'Items',

        activate: function () {}
    } );

    console.log('created Item', Item );
    return Item;

} );
