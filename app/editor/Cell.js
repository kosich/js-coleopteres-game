'use strict';

import _ from 'lodash';
import Basic from '../Entities/Basic.js';
import Entities from '../Entities/_.js';
import { CELL_X, CELL_Z, CELL_Y } from '../const.js';

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

    // serialization{{{
    serialyze (){
        let serialyzed = {
            x: this.x,
            y: this.y,
            z: this.z
        };

        if ( this.item ){
            console.log( 'serialyzing', this.item );
            serialyzed.item = this.item.serialyze();
        }

        return serialyzed;
    }

    static deserialyze ( serialyzed, renderGroup ){
        let cell = new Cell( serialyzed.x, serialyzed.y, serialyzed.z, renderGroup );

        if ( serialyzed.item ){
            cell.add( Basic.deserialyze( serialyzed.item ) );
        }

        return cell;
    }
    //}}}

    // META
    isBlock () {
        // TODO: set it on item add/remove
        return this.item && this.item instanceof Entities.Blocks.Block;
    }

    isRamp(){
        return this.item && this.item instanceof Entities.Blocks.Ramp;
    }

    isPlayer (){
        return this.item && this.item instanceof Entities.Player;
    }

}

function addSprite( rg, img, x, y, z ) {
    // console.log( 'puting item to ', x, y, z );
    let sprite = rg.create( x * CELL_X, y * CELL_Y - z * CELL_Z, img );
    sprite._y = y;
    sprite._z = z;
    return sprite;
}

export default Cell;
