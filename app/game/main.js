define([ 'phaser', 'game/gameworld', 'levelProvider', 'assets' ], function( Phaser, GameWorld, levelProvider, assets ){
    'use strict';

    console.log( 'gameworld', GameWorld );

    var world,
        player,
        renderGroup;

    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gamepane', {
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

        world = new GameWorld( renderGroup, this );
        world.load( levelProvider.load() );

        player = world.player;

        game.stage.backgroundColor = '#335';

        // Make the default camera follow the ufo.
        game.camera.follow(player.sprite);

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
        world.updateRenderSort();
    }


    function render() { }
    function reset (){ }

    return game;

});
