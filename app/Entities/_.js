define( [ 'Entities/Blocks/_', 'Entities/Objects/_', 'Entities/Items/_', './Enemy/_', './Player/_' ], function ( Blocks, Objects, Items, Enemy, Player ) {
    'use strict';

    var Entities = {
        Items: Items,
        Objects: Objects,
        Blocks: Blocks,
        Enemy : Enemy,
        Player : Player
    };

    console.log( ' Entities', Entities );

    return Entities;
} );
