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
        add : add,
        remove : remove
    };

    var cursor,
        cells,
        field,
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
    };

    function add( Item ){
        // expand the field to contain the item
        recalculateFieldSize();

        // assign new item to the cell
        getCurrentCell().add( Item );
    };

    function remove(){
        var cell = getCurrentCell();
    };

    function getCurrentCell (){
        return this.field[this.currentCursor.y][this.currentCursor.x];
    }

    // TODO: move to Field
    function recalculateFieldSize(){
        // add columns
        // >>> expansion
        if ( cursor.x >= field.width ){
            field.forEach(function( row, y ){
                for( var x = field.width; x < cursor.x; x++ ){
                    // TODO: no need to add cells here
                    // add cell in add method
                    var cell = new Cell( x, y, group );
                    cell.add( Blocks.Stone );
                    cells.push( cell );
                    row.push( cell );
                }
            });
        }
        if ( field[0] )
            field.width = field[0].length;
        else field.width = 0;

        // add rows
        // vvv expansion
        while ( cursor.y >= field.length ){
            var row = [];
            for( var x = 0; x < field.width; x++ ){
                var cell = new Cell( x, field.length, group );
                cell.add( Blocks.Stone );
                cells.push( cell );
                row.push( cell );
            }
            field.push(row);
        }
        field.height = field.length;

        return;
        throw 'not implemented';

        if ( cc.x < 0 ){
            var mx = 0;

            while( mx-- > cc.x ){
                field.forEach(function( row ){
                    var cell = new Cell();
                    cells.push( cell );
                    row.unshift( cell );
                });
            }

            cells.forEach( function( cell ){
                if ( !cell.sprite )
                    return;
                cell.sprite.x -= cc.x*CELL_W;
            });
            w.cs.x -= cc.x*CELL_W;

            cc.x = 0;
            field.width = f[0].length;
        }

        if ( cc.y < 0 ){
            var my = 0;
            while( my-- > cc.y ){
                var row = [];
                for( var x = 0; x<field.width; x++ ){
                    var cell = new Cell();
                    cells.push( cell );
                    row.push( cell );
                }
                field.unshift(row);
            }

            cells.forEach( function( cell ){
                if ( !cell.sprite )
                    return;
                cell.sprite.y -= cc.y*CELL_H;
            });
            w.cs.y -= cc.y*CELL_H;

            cc.y = 0;
            field.height = field.length;
        }

        console.log( 'expanded', field.width, field.height, cells );
    }

    return world;
})();
