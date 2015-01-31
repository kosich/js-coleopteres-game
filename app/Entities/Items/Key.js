define(['common', 'Entities/Items/Item'], function ( common, Item ) {
    'use strict';

    console.log('item', Item);

    var Key = common._inherit( Item , {
        img : 'Key.png',
        _type : 'Key'
    });

    return Key;

});

