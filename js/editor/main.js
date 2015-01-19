(function(){

    var LEVEL_HEIGHT = 37, // height of a normal block
        CELL_W = 101,
        CELL_H = 83,

        ITEM_H = CELL_H * 1.5;
        ITEM_W = CELL_W;

    var currentItem = 0;

    var imgs = [
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
        'Character Boy.png'
    ];

    var items = [],
        floorGroup,
        itemGroup;

    var e = new Phaser.Game(1200, 900, Phaser.AUTO, 'gamepane', {
        preload : preload,
        create: create,
        update: update
    });

    function preload(){
        imgs.forEach( function ( img ){
            e.load.image(img, 'assets/img/' + img);
        } );

        e.load.image('Selector.png', 'assets/img/' + 'Selector.png');
    }

    function create(){
        e.stage.backgroundColor = '#333';
        floorGroup = e.add.group();
        itemGroup = e.add.group();

        var item;
        imgs.forEach( function( img, i ){
            item = {
               sprite : itemGroup.create( 0, i * ITEM_H, img ),
               img : img
            };

            item.sprite.alpha = 0.5;
            item.sprite.anchor.set( .5, .5 );

            items.push( item );
        } );

        itemGroup.scale.set(.5, .5);
        itemGroup.y += ITEM_H / 2;
        itemGroup.x += ITEM_W / 2;

        floorGroup.x += ITEM_W;

        setCurrent( 0 );

        world.init();
        e.camera.follow(world.cs);

        e.world.setBounds(-400, -400,  400,  400);

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
            'up'     : function(){ world.moveCursor( [ 0, -1 ] ) },
            'right'  : function(){ world.moveCursor( [ 1, 0 ] ) },
            'down'   : function(){ world.moveCursor( [ 0, 1 ] ) },
            'left'   : function(){ world.moveCursor( [ -1, 0 ] ) },

            't-up'   : function(){  setCurrent ( currentItem - 1 ); },
            't-down' : function(){ setCurrent ( currentItem + 1 ); },

            'select' : function(){ world.add( items[ currentItem ] ); },
            'remove' : function(){ world.remove(); }
        };

        keys[ dir ]();
    }

    function update(){
        floorGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    var world = (function(){

        var w = {};

        var cc = w.cc = { x : 0, y : 0 };
        var f  = w.field = [[]];
        f.width = 0;
        f.height = 0;

        w.init = function world_init(){
            w.g = e.add.group();

            var cursorGroup = e.add.group();
            w.cs = cursorGroup.create( 0, 0, 'Selector.png' );
            // w.cs.anchor.set( .18, .24 );
            w.cs.anchor.set( 0, .24 );

            w.g.x += CELL_H;
            cursorGroup.x += CELL_W;

            w.add( items[ 0 ] );
        };

        w.moveCursor = function world_moveCursor( d ){
            w.cc.x += d[ 0 ];
            w.cc.y += d[ 1 ];

            w.cs.x = w.cc.x * CELL_W;
            w.cs.y = w.cc.y * CELL_H;

            console.log( w.cc );
        };

        w.add = function world_add( item ){
            // console.log( 'adding to ', item );
            expand();
            console.log( f );

            floorGroup.create( w.cc.x * CELL_W, w.cc.y * CELL_H, item.img );
        };

        w.remove = function world_remove(){
            
        };


        function expand(){
            // add columns
            while ( cc.x >= f[0].length ){
                f.forEach(function( row, x ){
                    row.push( new Cell(x, f.length -1, { type: 0 } ) );
                });
            }
            f.width = f[0].length;

            // add rows
            while ( cc.y >= f.length ){
                var row = [];
                for( var x = 0; x < f.width; x++ ){
                    row.push( new Cell(x, f.length -1, { type: 0 } ) );
                }
                f.push(row);
            }
            f.height = f.length;
        }

        return w;
    })();


})();
