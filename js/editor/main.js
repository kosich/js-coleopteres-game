(function( global ){
    'use strict';

    // Q: How world data would be stored?
    // A: Its a map {
    //   heroSpawnPos : 1,1
    //   Area : [ [ 
    //          Cell 
    //   ] ]
    // }
    //
    // Editor has it's own world


    var currentItem = 0;
    var world = global.world;

    var Tools = {
        Blocks:[
            Block.Stone,
            Block.Water,
            Block.Grass
        ],
        Objects: [
            // tree,
            // bush,
            // rock
        ],
        Player: undefined,
        Enemy: undefined
    };

        // items
        //     key
        //     tellyport

        // objects
        //     tree
        //     bush
        //     rock

        // player
        // enemy

        // 'Key.png',

        // 'Gem Blue.png',
        // 'Gem Green.png',
        // 'Gem Orange.png',

        // 'Tree Short.png',
        // 'Tree Tall.png',
        // 'Tree Ugly.png',
        // 'Rock.png',

        // 'Enemy Bug.png',
        // 'Character Boy.png'


    var items = [],
        floorGroup,
        itemGroup;

    var e = new Phaser.Game(1200, 900, Phaser.AUTO, 'gamepane', {
        preload : preload,
        create: create,
        update: update
    });

    function preload(){
        // Preload all imgs for the tools
        // moveout to some global function
        Tools.Blocks.forEach( function ( Tool ){
            console.log( 'loading img', Tool.prototype.img );
            e.load.image(Tool.prototype.img, 'assets/img/' + Tool.prototype.img);
        });

        // set as reusable either
        e.load.image('Selector.png', 'assets/img/' + 'Selector.png');
    }

    function create(){
        // create toolbox
        // create world/area
        // adjust view
        // set controls

        e.stage.backgroundColor = '#333';
        floorGroup = e.add.group();
        itemGroup = e.add.group();

        var item;
        Tools.Blocks.forEach( function( Block, i ){
            item = new Block();
            item.sprite = itemGroup.create( 0, i * ITEM_H, item.img );
            item.sprite.alpha = 0.5;
            item.sprite.anchor.set( .5, .5 );
            items.push( item );
        } );

        itemGroup.scale.set(.5, .5);
        itemGroup.y += ITEM_H / 2;
        itemGroup.x += ITEM_W / 2;

        floorGroup.x += ITEM_W;

        setCurrent( 0 );

        world.init( e );
        e.world.setBounds(0, 0, 1920, 1920);
        e.camera.follow(world.cursor.sprite);

        // TODO: refactor to proper
        document.addEventListener('keydown', function(e) {
            var allowedKeys = {
                38: 'up',
                39: 'right',
                40: 'down',
                37: 'left',

                75: 't-up',
                76: 't-right',
                74: 't-down',
                72: 't-left',

                13: 'select',
                46: 'remove'
            };

            if ( e.keyCode in allowedKeys )
                handleInput(allowedKeys[e.keyCode]);
            else 
                console.log( e );
        });
    }

    // TODO: move to toolbox.js
    var scaleFactor = 1.1;
    function setCurrent ( id ){
        if ( id < 0 )
            id = items.length - 1;
        else if (id >= items.length )
            id = 0;

        var item = items[ currentItem ],
            titem = items[ id ];

        if ( item && item.tween ){
            item.tween.pause();
            e.add.tween( item.sprite )
                .to( { alpha : .25 }, 100 )
                .start();

            e.add.tween( item.sprite.scale )
                .to( { x : 1, y : 1 }, 100 )
                .start();
        }

        
        if ( titem && !titem.tween ){
            titem.tween = e.add.tween( titem.sprite );
            titem.tween
                .to( { y : id * ITEM_H + 3 }, 500 )
                .to( { y : id * ITEM_H }, 500 )
                .loop()
                .start();
        }
        else {
            titem.tween.resume();
        }

        e.add.tween( titem.sprite )
            .to( { alpha : 1 }, 100 )
            .start();

        e.add.tween( titem.sprite.scale )
            .to( { x : scaleFactor, y : scaleFactor }, 100 )
            .start();

        currentItem = id;
    }

    function handleInput( dir ){
        var keys = {
            'up'     : function(){ world.cursor.move(  0, -1 ) },
            'right'  : function(){ world.cursor.move(  1,  0 ) },
            'down'   : function(){ world.cursor.move(  0,  1 ) },
            'left'   : function(){ world.cursor.move( -1,  0 ) },

            't-up'   : function(){ setCurrent ( currentItem - 1 ); },
            't-down' : function(){ setCurrent ( currentItem + 1 ); },

            'select' : function(){ world.add( items[ currentItem ] ); },
            'remove' : function(){ world.remove(); }
        };

        keys[ dir ]();
    }

    function update(){
        // actually got nothing to do,
        // except sorting via Z and Y axis
        floorGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    }



})( this );
