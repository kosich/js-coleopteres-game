define( [ 'underscore', 'World/world', 'World/Cell', 'Entities/_', 'common' ], function ( _, World, Cell, Entities, common ) {
    'use strict';

    var GameWorld = common._inherit( World, {
        load: function load( level ) {
            console.log( 'loading level ', level );
            imp.call( this, level );
        },
        update: function update( delta ) {
            // ais.foreach.move;
        }
    } );

    // tempo
    function imp( exported ) {
        var self = this;

        // reset all current settings
        // & remove all current cells
        this.removeAll();
        console.log( 'cleared cells ' );

        // import world properties

        if ( exported.cells ) {
            this.cells = exported.cells.map( function ( def ) {
                try {
                    var cell = Cell.deserialyze( def, self.renderGroup );
                    if ( cell.item && ( cell.item instanceof Entities.Player ) ) {
                        self.player = cell.item;
                        self.player.x = cell.x;
                        self.player.y = cell.y;
                        self.player.z = cell.z;
                        console.log( 'Im a playyya' )
                        return;
                    }
                    return cell;
                } catch ( exc ) {
                    // console.warn('couldnt load cell def', def);
                    console.error( exc );
                }
            } ).filter( function ( cell ) {
                return !!cell;
            } );
        }

        this.updateRender();
    }

    console.log( 'created', GameWorld );

    return GameWorld;

    // function World ( ){
    //     var self = this;
    //     this.enemies = [];
    //     this.items = [];
    //     this.map = map;

    //     var field = this.field = map.cellTypes.map( function( row, y ){
    //         return row.map( function( f, x ){
    //             if ( f === undefined )
    //                 return undefined;
    //             else
    //                 return new Cell( x, y, { type : f, level : map.levels[y][x] } );
    //         } );
    //     } );

    //     map.items.forEach( function( itemDefinition ){
    //         console.log( itemDefinition );
    //         var type = global[itemDefinition.type];
    //         var args = itemDefinition.args;
    //         var item = Object.create( type.prototype );
    //         type.apply( item, args);
    //         self.addItem( itemDefinition.position[0], itemDefinition.position[1], item );
    //     } );

    //     field.height = field.length;
    //     field.width = field[0].length;

    //     this.player = new Player( );
    //     this.addItem( map.spawnPoint[0], map.spawnPoint[1], this.player );

    // };

    // _.extend( World.prototype, {
    //     init : function init(){

    //     },
    //     move : function move ( object, direction ){
    //         var n = { x: object.cell.x + direction.x, y : object.cell.y + direction.y },
    //         inBox = true;

    //         var isEnemy = object != this.player;

    //         if ( n.y >= this.field.height || n.x >= this.field.width || n.x < 0 || n.y < 0 ){
    //             inBox = false;
    //         }

    //         if ( !inBox ){
    //             // remove enemy from the entities
    //             if ( isEnemy )
    //                 this.destroy(object); 

    //             return;
    //         }

    //         var tCell = this.field[n.y][n.x];
    //         if ( !tCell )
    //             return;

    //         if( !object.canInhabbit( tCell.type ) )
    //             return;

    //         if( Math.abs(object.cell.level - tCell.level) > .5 ) // cannot step on an object, thats level/2 heigher or lower
    //             return;

    //         putToCell( object.cell, tCell, object );
    //     },
    //     tellyportTo : function tellyportTo ( from, to, item ){
    //         console.log( 'tellyported' );

    //         putToCell( from.cell, to.cell, item );
    //         this.destroy( from );
    //         this.destroy( to );
    //     },
    //     findItem : function findItem ( type, comparator ){
    //         return this.items.find( function( item ){
    //             return (item instanceof type)
    //                 && (!comparator || comparator.apply( this, arguments )) ;
    //         });
    //     },
    //     addItem : function addItem ( x, y, item ){
    //         var cell = this.field[y][x];
    //         if (!cell)
    //             throw 'failed to add item to an empty cell';

    //         if ( item instanceof Enemy ){
    //             if ( item != this.player )
    //                 this.enemies.add( item );
    //         }
    //         else 
    //             this.items.push( item );

    //         putToCell( undefined, cell, item );
    //     },
    //     enemyFrequency : 0,
    //     step : function step ( dt ){
    //         // spawn AIs
    //         var map = this.map,
    //             self = this;

    //         this.enemyFrequency -= dt;
    //         if ( this.enemies.length < 4 && this.enemyFrequency < 0){

    //             this.enemyFrequency = Math.floor(Math.random() * 1000) + 500;

    //             var spc = Math.floor(Math.random() * map.enemySpawnCoordinates.length);
    //             if (spc == map.enemySpawnCoordinates.length)
    //                 spc = map.enemySpawnCoordinates.length -1;

    //             var c = map.enemySpawnCoordinates[ spc ];

    //             var cell = this.field[ c[1] ][ c[0] ];

    //             if ( !cell.entities.find( function( e ){
    //                 return e instanceof Enemy;
    //             } ) ){
    //                 var enemy = new Enemy( 2 );
    //                 putToCell( undefined, cell, enemy );
    //                 this.enemies.push( enemy );

    //                 game.add( enemy );
    //             }
    //         }

    //         // move AIs
    //         this.enemies.forEach(function(enemy) {
    //             enemy.update(dt);
    //         });
    //         this.player.update();

    //         this.player.cell.entities.forEach( function( e ){
    //             if ( e === self.player )
    //                 return;

    //             if ( e instanceof Enemy)
    //                 self.player.die();

    //             if ( e.activate )
    //                 e.activate( self.player );

    //         } );
    //     },
    //     destroy : function destroy ( entity ){
    //         if ( entity instanceof Enemy ){
    //             this.enemies.splice( this.enemies.indexOf( entity ), 1 );
    //         } else {
    //             this.items.splice( this.enemies.indexOf( entity ), 1 );
    //         }
    //         putToCell(entity.cell, undefined, entity);

    //         entity.destroy && entity.destroy();
    //     }

    // } );


    // function putToCell( from, to, item ){
    //     if ( from ){
    //         from.entities.splice( from.entities.indexOf( item ), 1 );
    //     }

    //     if ( to ){
    //         to.entities.push( item );
    //     }

    //     item.cell = to;
    // }

    //     function updateMovable ( item ){
    //         game.add.tween( item._sprite )
    //         .to( {
    //             x : coor.x ( item.cell ), 
    //             y : coor.y ( item.cell ) 
    //         } , 30, Phaser.Easing.Linear.None )
    //         .start();
    //     }

    // function add ( item ){
    //     var sprite = itemsGroup.create( coor.x( item.cell ), coor.y( item.cell ), item.sprite );
    //     sprite.anchor.setTo(0, .2);
    //     item._sprite = sprite;

    //     item.onDestroy( function(){
    //         sprite.kill ();
    //     } );
    //     return sprite;
    // }


    // return World;
} );
