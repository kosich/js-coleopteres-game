define(['underscore', 'common', 'Entities/Items/Item', 'Entities/Items/Key', 'Entities/Items/Tellyport'], function( _, common, Item, Key, Tellyports ){
    'use strict';

    var Items = {
        Item : Item,
        Key : Key
    };

    // add tellyports [0,1,2]
    _.extend( Items, Tellyports );

    return Items;


});
