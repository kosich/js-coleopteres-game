var world = (function(){
    'use strict';

    // public methods:
    // --
    // init
    // --
    // moveCursor( dx, dy )
    // add( Item )
    // remove(  )
    // --
    // -- possible
    // export
    // moveCursorTo( x, y )
    // list (  ) // enlist all items in current cell


    var world = {
        init : init,
        cursor : undefined,
        update : update,
        add : add,
        remove : remove
    };

    var cursor,
        cells,
        group,
        cursorGroup;

    // inits the world
    // creates area, positions selector
    function init( editor ){
        group = editor.add.group();
        cursorGroup = editor.add.group();

        cursor = this.cursor = new Cursor( cursorGroup.create( 0, 0, 'Selector.png' ) );

        group.x += CELL_H;
        cursorGroup.x += CELL_W;

        cells = [];
    }

    function update(  ){
        group.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    function add( Item ){
        // expand the field to contain the item
        var cell = getCurrentCell();
        if ( !cell ){
            cell = new Cell( cursor.x, cursor.y, group );
            cells.push( cell );
        }
        // assign new item to the cell
        return cell.add( Item );
    }

    function remove(){
        var cell = getCurrentCell();
        cell.remove();
        cells.splice( cells.indexOf( cell ), 1 );
    }

    function getCurrentCell (){
        return cells.find( function( cell ){
            // ? might use Point class with it's comparision
            return cell.x === cursor.x && cell.y === cursor.y;
        } );
    }

    return world;
})();
