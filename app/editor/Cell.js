'use strict';

var _ = require( 'lodash' ),
    Basic = require( '../Entities/Basic.js' ),
    Entities = require( '../Entities/_.js' );

class Cell {

    constructor ( x, y, z, renderGroup ) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.renderGroup = renderGroup;
    }

    add ( item ) {
        if ( this.item )
            throw 'cell already has a block';

        this.item = item;

        item.sprite = addSprite( this.renderGroup, item.img, this.x, this.y, this.z );
        return this;
    }

    remove () {
        if ( this.item ){
            this.item.sprite.destroy();
        }

        return this;
    }

    // serialization
    serialyze (){
        let serialyzed = {
            x: this.x,
            y: this.y,
            z: this.z
        };

        if ( this.item ){
            // console.log( this.item );
            serialyzed.item = this.item.serialyze();
        }

        return serialyzed;
    }

    // META
    isBlock () {
        // TODO: set it on item add/remove
        return this.item && this.item instanceof Entities.Blocks.Block;
    }

    isRamp(){
        return this.item && this.item instanceof Entities.Blocks.Ramp;
    }

    static deserialyze ( serialyzed, renderGroup ){
        let cell = new Cell( serialyzed.x, serialyzed.y, serialyzed.z, renderGroup );

        if ( serialyzed.item ){
            cell.add( Basic.deserialyze( serialyzed.item ) );
        }

        return cell;
    }
}

function addSprite( rg, img, x, y, z ) {
    // console.log( 'puting item to ', x, y, z );
    let sprite = rg.create( x * CELL_X, y * CELL_Y - z * CELL_Z, img );
    sprite._y = y;
    sprite._z = z;
    return sprite;
}

module.exports = Cell;
