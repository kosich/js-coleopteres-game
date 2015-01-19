(function( global ){
    'use strict';

    var LEVEL_HEIGHT = 37, // height of a normal block
    CELL_W = 101,
    CELL_H = 83;


    var game = new Phaser.Game(1200, 1000, Phaser.AUTO, 'gamepane', {
        preload : preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {
        [
            'Stone Block.png',
            'Water Block.png',
            'Grass Block.png',

            'Key.png',

            'Gem Blue.png',
            'Gem Green.png',
            'Gem Orange.png',

            'Tree Short.png',
            'Tree Tall.png',
            'Tree Ugly.png',
            'Rock.png',

            'Enemy Bug.png',
            'Character Boy.png'].forEach( function( img ){
                game.load.image(img, 'assets/img/' + img);
            } );
    }

    var world,
        player,
        playerSprite,
        cursors,
        floorGroup,
        itemsGroup;

    var coor = {
        x : function getX( c ){
            return c.x * CELL_W;
        },
        y : function getY ( c ){
            return c.y * CELL_H - c.level * LEVEL_HEIGHT;
        }
    };

    function add ( item ){
        var sprite = itemsGroup.create( coor.x( item.cell ), coor.y( item.cell ), item.sprite );
        sprite.anchor.setTo(0, .2);
        item._sprite = sprite;

        item.onDestroy( function(){
            sprite.kill ();
        } );
        return sprite;
    }

    function create() {
        world = global.world = new global.World( Map );
        player = world.player;

        game.stage.backgroundColor = '#333';
        floorGroup = game.add.group();
        itemsGroup = game.add.group();

        world.field.forEach( function( row, y ){
            row.forEach( function( cell, x ){
                if ( !cell )
                    return;

                floorGroup.create(coor.x( cell ), coor.y( cell ), cell.sprite );
            } );
        } );
        floorGroup.sort('y', Phaser.Group.SORT_ASCENDING);

        world.field.forEach( function( row, y ){
            row.forEach( function( cell, x ){
                if ( !cell )
                    return;

                cell.entities.forEach( function( item ){
                    if ( item === player )
                        return;

                    var y = coor.y( cell ) - CELL_H/2;
                    var s = itemsGroup.create( coor.x( cell ), y, item.sprite );
                    game.add.tween( s )
                        .to( { y: y + 5 }, Math.floor(Math.random() * 1000 + 1000), Phaser.Easing.Quadratic.InOut )
                        .to( { y: y } , Math.floor(Math.random() * 1000 + 1000), Phaser.Easing.Quadratic.InOut )
                        .loop()
                        .start();

                } );
            } );
        } );

        playerSprite = add ( player );

        console.log( 'putting ps', playerSprite.x, playerSprite.y );

        // Make the default camera follow the ufo.
        game.camera.follow(playerSprite);

        game.world.setBounds(-500, -500, world.width * CELL_W + 500, world.height * CELL_H + 500);

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
        world.step( game.time.elapsed );

        world.enemies.forEach( updateMovable );
        updateMovable( player );

        itemsGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    function updateMovable ( item ){
        game.add.tween( item._sprite )
        .to( {
            x : coor.x ( item.cell ), 
            y : coor.y ( item.cell ) 
        } , 30, Phaser.Easing.Linear.None )
        .start();
    }

    function render() {
        // game.debug.text("This is drawn in render()", 0, 80);
    }

    function reset (){

    }

    global.game = {
        add : add
    };

})( this );
