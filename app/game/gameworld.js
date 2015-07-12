'use strict';

import _ from 'lodash';
import Phaser from 'phaser';
import World from './world.js';
import Entities from '../Entities/_.js';
import Cell from './Cell.js';
import common from '../common.js';
import { CELL_Z, CELL_X, CELL_Y } from '../const.js';

var GameWorld = common._inherit( World, {
    field: undefined, // [[[]]] z y x arrays

    load( level ) {
        console.log( 'loading level ', level );
        // temporary
        imp.call( this, level );
        var size = {
            width: this.field.width * CELL_X,
            height: this.field.height * CELL_Y
        };
        this.game.world.setBounds( 0, 0, size.width, size.height );
        // this.game.camera.setSize( size.width, size.height );
        // this.game.camera.setBoundsToWorld();
    },

    update( delta ) {
        // ais.foreach.move;
        // world.enemies.forEach( updateMovable );
        updateMovable.call( this, this.player );
    },

    move( item, pos ) {
        // moving item to 
        // console.log( item.x, item.y, item.z );
        let currentCell = this.field[ item.z ][ item.y ][ item.x ];
        let underneathCell = this.field[ item.z - 1 ][ item.y ][ item.x ];

        let targetCell;

        if ( underneathCell.isRamp() ){
            // if slope goes down, z--
            // else z++
            item.movementDirection.x;
            item.movementDirection.y;

            let z = pos.z,
                y = pos.y + underneathCell.item.rampDirection[1],
                x = pos.x + underneathCell.item.rampDirection[0];

            console.log('current ramp', item.x, item.y, item.z);
            console.log('current ramp', x, y, z);

            targetCell = this.field[ z ][ y ][ x ];
        } else {
            targetCell = this.field[ pos.z ][ pos.y ][ pos.x ];
        }

        if ( !targetCell || ( targetCell.item && !targetCell.isRamp() ) ) {
            console.warn( 'target cell wasnt found', pos, targetCell );
            return;
        }

        if ( targetCell.isRamp() ) {
            targetCell = this.field[ pos.z + 1 ][ pos.y ][ pos.x ];
        }

        delete currentCell.item;
        targetCell.item = item;

        item.x = targetCell.x;
        item.y = targetCell.y;
        item.z = targetCell.z;

        item.sprite._y = item.y;
        item.sprite._z = item.z;

        this.game.add.tween( item.sprite )
        .to( {
            x: coor.x( item ),
            y: coor.y( item )
        }, 30, Phaser.Easing.Linear.None )
        .start();

    }
}, {
    init: function ( group, game ) {
        this.game = game;
    }
} );

var coor = {
    x: function getX( c ) {
        return c.x * CELL_X;
    },
    y: function getY( c ) {
        return c.y * CELL_Y - c.z * CELL_Z;
    }
};


function updateMovable( item ) {
    if ( !item.movementDirection.x && !item.movementDirection.y )
        return;

    console.log( 'moving' );
    this.move( item, {
        x: item.x + item.movementDirection.x,
        y: item.y + item.movementDirection.y,
        z: item.z
    } );

    item.movementDirection.x = 0;
    item.movementDirection.y = 0;
}


// tempo
function imp( exported ) {
    console.group( 'Importing' );
    var self = this;

    // reset all current settings
    // & remove all current cells
    this.removeAll();
    console.log( 'cleared cells ' );

    // import world properties

    var cellsAxisMinMax = {};
    if ( exported.cells ) {
        // count min-max
        // TODO: moveout to editor?
        exported.cells.forEach( function ( cell ) {
            [ 'x', 'y', 'z' ].forEach( function ( axis ) {
                [ 'min', 'max' ].forEach( function ( m ) {
                    cellsAxisMinMax[ axis + m ] = Math[ m ]( cell[ axis ], cellsAxisMinMax[ axis + m ] || 0 );
                } );
            } );
        } );
        console.log( 'minmax cells axis', cellsAxisMinMax );

        this.cells = exported.cells.map( function ( def ) {
            try {
                def.x -= cellsAxisMinMax.xmin;
                def.y -= cellsAxisMinMax.ymin;
                def.z -= cellsAxisMinMax.zmin;

                var cell = Cell.deserialyze( def, self.renderGroup );
                if ( cell.item && ( cell.item instanceof Entities.Player ) ) {
                    self.player = cell.item;
                    self.player.x = cell.x;
                    self.player.y = cell.y;
                    self.player.z = cell.z;
                    return; // TODO: comment an early exit
                }
                return cell;
            } catch ( exc ) {
                console.warn('couldnt load cell def', def);
                throw exc;
            }
        } ).filter( function ( cell ) {
            return !!cell;
        } );


        this.field = new Array( cellsAxisMinMax.zmax - cellsAxisMinMax.zmin + 2 ); // +1 for extra movement level
        this.field.deph = this.field.length;
        this.field.height = cellsAxisMinMax.ymax - cellsAxisMinMax.ymin + 1;
        this.field.width = cellsAxisMinMax.xmax - cellsAxisMinMax.xmin + 1;

        // create y axis arrays
        for ( var z = 0; z < this.field.length; z++ ) {
            var ylayer = this.field[ z ] = new Array( this.field.height );

            // create x axis arrays
            for ( var y = 0; y < ylayer.length; y++ ) {
                ylayer[ y ] = new Array( this.field.width );
            }
        }

        console.log( 'created empty field', this.field );

        this.cells.forEach( function ( cell ) {
            var x = cell.x,
                y = cell.y,
                z = cell.z;

            self.field[ z ][ y ][ x ] = cell;
        } );

        console.log( 'converted cells to field', self.field );

        // TODO: refactor to check only top cells
        console.group( 'creating walklayer' );
        for ( var z = 0; z < this.field.deph; z++ ) {
            for ( var y = 0; y < this.field.height; y++ ) {
                for ( var x = 0; x < this.field.width; x++ ) {
                    if ( !this.field[ z ][ y ][ x ] )
                        continue;

                    if ( this.field[ z ][ y ][ x ].isBlock() && !this.field[ z + 1 ][ y ][ x ] )
                        this.field[ z + 1 ][ y ][ x ] = new Cell( x, y, z + 1, null );
                }
            }
        }

        console.groupEnd();
    }

    console.log( 'final field', this.field );

    console.groupEnd();

    this.updateRender();
}

export default GameWorld;
