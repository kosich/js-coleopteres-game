'use strict';

// TODO: this repeats much editor/world

import _ from 'lodash';
import { CELL_X, CELL_Z, CELL_Y } from '../const.js';

// public properties:
//
//
// public methods:
// --
// init
// --
// add( Item )
// remove(  )
//
//
// <<POSSIBLE>>
// save
// export

// inits the world
function World( renderGroup ) {
    this.renderGroup = renderGroup;
    this.cells = [];
    this._shadows = [];
}

_.extend( World.prototype, {
    add: add,
    removeAt: removeAt,
    remove: remove,
    removeAll : removeAll,
    getCellAt : getCellAt,
    updateRender : updateRender,
    updateRenderSort : updateRenderSort,
    updateShadows : updateShadows
});

function add( x, y, z, Item ) {
    // expand the field to contain the item
    var cell = this.getCellAt( x, y, z );
    if ( !cell ) {
        cell = new Cell( x, y, z, this.renderGroup );
        this.cells.push( cell );
    }
    // assign new item to the cell
    cell.add( new Item() );

    this.updateRender();
}

function removeAll(  ){
    var len = this.cells.length;
    while( --len >= 0 ){
        this.cells[ len ].remove();
    }
    this.cells.splice( 0 );
    this.updateRender();
}

function remove( cell ) {
    if ( !cell ) {
        console.warn( 'nothing to remove' );
        return;
    }

    cell.remove();
    this.cells.splice( this.cells.indexOf( cell ), 1 );
    this.updateRender();
}

function removeAt( x, y, z ) {
    this.remove( this.getCellAt( x, y, z ) );
}

function getCellAt( x, y, z ) {
    return this.cells.filter( function ( cell ) {
        // ? might use Point class with it's comparision
        return cell.x === x && cell.y === y && cell.z === z;
    } )[ 0 ]; // TODO: use `cells.find` as soon as it's available
}

function updateRender (){
    this.updateShadows();
    this.updateRenderSort();
}

function updateRenderSort( ) {
    // properly sort the cells
    this.renderGroup.customSort( function ( a, b ) {
        return a._y - b._y || a._z - b._z;
    } );
}

// SHADOWS RENDERING :: REFACTOR 
// {{{
function updateShadows( ) {
    var self = this;

    this._shadows.forEach( function ( shadow ) {
        shadow.destroy();
    } );

    this._shadows.splice( 0 );

    this.cells.forEach( function ( cell ) {
        // cancel if current is not block
        if ( !cell.isBlock() )
            return;

        // cancel if its not the topmost block
        if ( isABlockAt(self, cell.x, cell.y, cell.z + 1 ) )
            return;

        addShadow.call( self, {
            r:  isABlockAt(self, cell.x + 1, cell.y, cell.z + 1 ),
            l:  isABlockAt(self, cell.x - 1, cell.y, cell.z + 1 ),
            t:  isABlockAt(self, cell.x, cell.y - 1, cell.z + 1 ),
            b:  isABlockAt(self, cell.x, cell.y + 1, cell.z + 1 ),

            tr: isABlockAt(self, cell.x + 1, cell.y - 1, cell.z + 1 ),
            tl: isABlockAt(self, cell.x - 1, cell.y - 1, cell.z + 1 ),
            br: isABlockAt(self, cell.x + 1, cell.y + 1, cell.z + 1 ),
            bl: isABlockAt(self, cell.x - 1, cell.y + 1, cell.z + 1 )
        }, cell );
    } );
}

function isABlockAt(self, x, y, z ) {
    var cell = self.getCellAt( x, y, z );
    if ( !cell )
        return false;

    // ramps don't cast shadows
    return cell.isBlock() && !cell.isRamp();
}

function addShadow( list, cell ) {
    var self = this;
    list.tr = list.tr & !( list.t || list.r );
    list.tl = list.tl & !( list.t || list.l );
    list.br = list.br & !( list.b || list.r );
    list.bl = list.bl & !( list.b || list.l );

    Object.keys( list ).forEach( function ( key ) {
        if ( !list[ key ] )
            return;

        // console.log( 'got shadow @ ', key );
        var sprite = self.renderGroup.create( cell.x * CELL_X, cell.y * CELL_Y - cell.z * CELL_Z, shadowImages[ key ] );
        sprite._y = cell.y;
        sprite._z = cell.z + 0.1; // shadows are slightly heigher then cells themeselves
        self._shadows.push( sprite );
    } );
}

var shadowImages = {
    r: 'Shadow East.png',
    l: 'Shadow West.png',
    t: 'Shadow North.png',
    b: 'Shadow South.png',
    tr: 'Shadow North East.png',
    tl: 'Shadow North West.png',
    br: 'Shadow South East.png',
    bl: 'Shadow South West.png'
};
// }}}

module.exports = World;

