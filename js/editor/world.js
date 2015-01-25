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
        removeAt : removeAt,
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
        group.x += CELL_X;
        cells = [];
    }

    function imp ( exported ){
        // reset all current settings
        // & remove all current cells
        cells.forEach( remove );
        console.log( 'cleared cells ', cells );

        // import world properties

        if ( exported.cells ){
            cells = exported.cells.map( function( def ){
                return (new Cell ( def.x, def.y, def.z, group ).add( Blocks.Plain ));
            } );
        }

        updateShadows();
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
        cell.add( Item );

        updateShadows();
    }

    function remove( cell ){
        if (!cell){
            console.warn( 'nothing to remove' );
            return;
        }

        cell.remove();
        cells.splice( cells.indexOf( cell ), 1 );
        updateShadows();
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


    // SHADOWS RENDERING :: REFACTOR 
    // {{{
    var shadows = [];
    function updateShadows(){
        shadows.forEach( function( shadow ){
            shadow.destroy();
        } );
        shadows.splice(0);

        cells.forEach( function( cell ) {
            if ( isABlockAt( cell.x, cell.y, cell.z +1 ) )
                return;

            addShadow ( {
                r : isABlockAt( cell.x +1, cell.y, cell.z + 1 ),
                l : isABlockAt( cell.x -1, cell.y, cell.z + 1 ),
                t : isABlockAt( cell.x, cell.y -1, cell.z + 1 ),
                b : isABlockAt( cell.x, cell.y +1, cell.z + 1 ),

                tr : isABlockAt( cell.x +1, cell.y -1, cell.z + 1 ),
                tl : isABlockAt( cell.x -1, cell.y -1, cell.z + 1 ),
                br : isABlockAt( cell.x +1, cell.y +1, cell.z + 1 ),
                bl : isABlockAt( cell.x -1, cell.y +1, cell.z + 1 )
            }, cell );
        });
    }

    function isABlockAt ( x, y, z ){
        var cell = getCellAt( x, y, z);
        if ( !cell )
            return false;

        return cell.item && cell.item instanceof Blocks.Basic;
    }

    function addShadow( list, cell ){
        list.tr = list.tr & !( list.t || list.r );
        list.tl = list.tl & !( list.t || list.l );
        list.br = list.br & !( list.b || list.r );
        list.bl = list.bl & !( list.b || list.l );

        Object.keys( list ).forEach( function( key ){
            if (!list[ key ])
                return;

            console.log( 'got shadow @ ', key );
            var sprite = group.create( cell.x * CELL_X, cell.y * CELL_Y - cell.z * CELL_Z, shadowImages[ key ] );
            sprite._z = cell.z + 0.1;
            shadows.push( sprite );
        } );
    }

    var shadowImages = {
        r : 'Shadow East.png',
        l : 'Shadow West.png',
        t : 'Shadow North.png',
        b : 'Shadow South.png',
        tr : 'Shadow North East.png',
        tl : 'Shadow North West.png',
        br : 'Shadow South East.png',
        bl : 'Shadow South West.png'
    };
    // }}}

    return world;
})();
