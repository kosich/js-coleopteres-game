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


    var currentItem = 0,
        world = global.world,
        cursor;

    var Tools = {
        Blocks: Object.keys(Blocks).map( function( key ){
            return Blocks[ key ];
        } ),
        Objects: Object.keys(Objects).map( function( key ){
            return Objects[ key ];
        } ),
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
        toolBoxGroup,
        cellGroup;

    var e = new Phaser.Game(1200, 900, Phaser.AUTO, 'gamepane', {
        preload : preload,
        create  : create,
        update  : update,
        render  : render
    });

    function preload(){
        // Preload all imgs for the tools
        // moveout to some global function
        Tools.Blocks.forEach( loadTool );
        Tools.Objects.forEach( loadTool );

        function loadTool ( Tool ){
            if ( Tool.prototype.img )
                e.load.image(Tool.prototype.img, 'assets/img/' + Tool.prototype.img);
        }

        // set as reusable either
        e.load.image('Selector.png', 'assets/img/' + 'Selector.png');
    }

    function create(){
        // create toolbox
        // create world/area
        // adjust view
        // set controls

        e.stage.backgroundColor = '#333';
        cellGroup = e.add.group();
        toolBoxGroup = e.add.group();

        var item;
        Tools.Blocks.concat( Tools.Objects ).filter( function( Tool ){
            return !!Tool.prototype.img;
        } )
        .forEach( function( Block, i ){
            item = new Block();
            item.sprite = toolBoxGroup.create( 0, i * ITEM_H, item.img );
            item.sprite.alpha = 0.5;
            item.sprite.anchor.set( .5, .5 );
            items.push( item );
        } );

        toolBoxGroup.scale.set(.5, .5);
        toolBoxGroup.y += ITEM_H / 2;
        toolBoxGroup.x += ITEM_W / 2;

        cellGroup.x += CELL_W;

        // toolbox current
        setCurrent( 0 );

        world.init( cellGroup );

        cursor = new Cursor( cellGroup.create( 0, 0, 'Selector.png' ) );

        e.world.setBounds(0, 0, 2000, 2000);
        e.camera.follow(cursor.sprite);

        // TODO: refactor to proper
        document.addEventListener('keydown', function(e) {
            var allowedKeys = {
                76: 'move:+x',
                72: 'move:-x',

                74: 'move:+y',
                75: 'move:-y',

                68: 'move:+z',  // D
                70: 'move:-z',  // F

                65: 't-up',     // A
                83: 't-down',   // S
                38: 't-up',     // UP ARROW
                40: 't-down',   // DOWN ARROW

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

    var moveRegex = /move:([+-])([xyz])/;
    function handleInput( dir ){
        if ( dir.indexOf('move:' ) === 0 ){
            // movement key
            var parsed = moveRegex.exec( dir ),
                moveModificator = [ 0, 0, 0 ];

            // ok, this needs explanation:
            // xyz charCodes are 120 121 122, so I set
            // only needed axis on moveModificator
            // eg.: `+` `x` =>
            // mM[ 120 - 120 ] = 1
            moveModificator[ parsed[ 2 ].charCodeAt(0) - 120 ] = parsed[ 1 ] === '+' ? 1 : -1;

            // now just apply our modificator array to cursor move, to match dx, dy, dz arguments
            cursor.move.apply( cursor, moveModificator );
        }
        else {
            ({
                't-up'   : function(){ setCurrent ( currentItem - 1 ); },
                't-down' : function(){ setCurrent ( currentItem + 1 ); },

                'select' : function(){ world.add( cursor.x, cursor.y, cursor.z, items[ currentItem ].constructor ); },
                'remove' : function(){ world.removeAt(cursor.x, cursor.y, cursor.z); }
            })[ dir ]();
        }
    }

    function update(){
        // actually got nothing to do,
        // except sorting via Z and Y axis
        world.update();
    }

    function render(){
        // editor.debug.text("Click to toggle! Sorting enabled: " + sorted, 2, 36, "#ffffff");
        e.debug.text(cursor.z, 2, 14, "#a7aebe");
    }



})( this );
