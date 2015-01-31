define([ 'phaser', 'game/gameworld', 'levelProvider', 'assets' ], function( Phaser, GameWorld, levelProvider, assets ){
    'use strict';

    console.log( 'gameworld', GameWorld );

    var world,
        player,
        renderGroup;

    var game = new Phaser.Game(1200, 1000, Phaser.AUTO, 'gamepane', {
        preload : preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {
        // preload images
        var self = this;
        assets.img.forEach( function ( img ){
            self.load.image( img, 'assets/img/' + img );
        } );
    }

    function create() {
        // create a new world,
        // load a level to it
        // add controlling
        // add eventlisteners, like player died

        renderGroup = game.add.group();

        world = new GameWorld( renderGroup );
        world.load( levelProvider.load() );

        player = world.player;

        game.stage.backgroundColor = '#335';

        // Make the default camera follow the ufo.
        game.camera.follow(player.sprite);
        game.world.setBounds(0, 0, 2000, 2000);

        // world.player.onDeath( init );

        // This listens for key presses and sends the keys to your
        // Player.handleInput() method. You don't need to modify this.
        document.addEventListener('keydown', function(e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',

                72: 'left',
                75: 'up',
                76: 'right',
                74: 'down'
            };

            if ( e.keyCode in allowedKeys )
                player.handleInput(allowedKeys[e.keyCode]);
        });
    }


    function update( game ) {
        // update world
        world.update( game.time.elapsed );
        // world.enemies.forEach( updateMovable );
        updateMovable( player );
        world.updateRenderSort();
    }

    var coor = {
        x: function getX( c ) {
            return c.x * CELL_X;
        },
        y: function getY( c ) {
            return c.y * CELL_Y - c.z * CELL_Z;
        }
    };


    function updateMovable( item ) {
        item.x += item.movementDirection.x;
        item.y += item.movementDirection.y;
        item.sprite._y = item.y;
        item.sprite._z = item.z;
        item.movementDirection.x = 0; 
        item.movementDirection.y = 0; 
        game.add.tween( item.sprite )
            .to( {
                x: coor.x( item ),
                y: coor.y( item )
            }, 30, Phaser.Easing.Linear.None )
            .start();
        
    }   


    function render() { }
    function reset (){ }

    return game;

});
