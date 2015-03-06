'use strict';

var _ = require( 'lodash' );

// CURSOR
class Cursor{
    constructor ( sprite ){
        // set offset for the image
        sprite.anchor.set( 0, .24 );

        this.sprite = sprite;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    } 

    move ( dx, dy, dz ){
        this.x += dx;
        this.y += dy;
        this.z += dz;

        this.sprite.x = this.x * CELL_X;
        this.sprite.y = this.y * CELL_Y - (this.z - 1) * CELL_Z; // cursor is shown at the bottom of current level
        this.sprite._y = this.y;
        this.sprite._z = this.z - .1; // so it doesnt overlap block
    }
}

module.exports = Cursor;
