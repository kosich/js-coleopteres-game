var world = (function(){
    'use strict';

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


    var world = {
        init : init,
        update : update,
        add : add,
        remove : remove,

        exp : exp,
        imp : imp
    };

    var cells,
        group;

    // inits the world
    // creates area, positions selector
    function init( renderGroup ){
        group = renderGroup;
        group.x += CELL_W;
        cells = [];
    }

    function imp ( exported ){
        // reset all current settings
        // & remove all current cells
        cells.forEach( remove );

        // import world properties

        if ( exported.cells ){
            cells = exported.cells.map( function( def ){
                return (new Cell ( def.x, def.y, def.z, group ).add( Blocks.Grass ));
            } );
        }

    }

    function exp (){
        // export all world properies
        // gravity or whatever
        var exported = {};
        exported.cells = cells.map( function( cell ){
            return {
                x : cell.x,
                y : cell.y,
                z : cell.z //,
                // item : cell.item.exp()
            };
        } );

        return exported;
    }

    function update(  ){
        // properly sort the cells
        group.customSort(function( a, b ){
            return ( a._z - b._z ) || ( a.y - b.y );
        });
    }

    function add( x, y, z, Item ){
        // expand the field to contain the item
        var cell = getCellAt( x, y, z );
        if ( !cell ){
            cell = new Cell( x, y, z, group );
            cells.push( cell );
        }
        // assign new item to the cell
        return cell.add( Item );
    }

    function remove( cell ){
        if (!cell){
            console.warn( 'nothing to remove' );
            return;
        }

        cell.remove();
        cells.splice( cells.indexOf( cell ), 1 );
    }

    function removeAt( x, y, z ){
        remove ( getCellAt( x, y, z ) );
    }

    function getCellAt ( x, y, z ){
        return cells.find( function( cell ){
            // ? might use Point class with it's comparision
            return cell.x === x && cell.y === y && cell.z === z;
        } );
    }

    return world;
})();
