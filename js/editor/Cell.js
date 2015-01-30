( function ( global ) {
    'use strict';

    function Cell( x, y, z, renderGroup ) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.renderGroup = renderGroup;
    }

    _.extend( Cell.prototype, {
        add: function add( item ) {
            if ( this.item )
                throw 'cell already has a block';

            this.item = item;

            item.sprite = addSprite( this.renderGroup, item.img, this.x, this.y, this.z );
            return this;
        },
        remove: function remove() {
            if ( this.item )
                this.item.sprite.destroy();

            return this;
        },

        // serialization
        serialyze : function serialyze(){
            var serialyzed = {
                x: this.x,
                y: this.y,
                z: this.z
            };

            if ( this.item ){
                // console.log( this.item );
                serialyzed.item = this.item.serialyze();
            }

            return serialyzed;
        },

        // META
        isBlock: function isBlock() {
            // TODO: set it on item add/remove
            return this.item && this.item instanceof Blocks.Block;
        },

        isRamp : function isRamp (){
            return this.item && this.item instanceof Blocks.Ramp;
        }

    } );

    // static methods
    _.extend(Cell, {
        deserialyze : function deserialyze( serialyzed, renderGroup ){
            var cell = new Cell( serialyzed.x, serialyzed.y, serialyzed.z, renderGroup );

            if ( serialyzed.item ){
                cell.add( Basic.deserialyze( serialyzed.item ) );
            }
            return cell;
        }
    });

    function addSprite( rg, img, x, y, z ) {
        // console.log( 'puting item to ', x, y, z );
        var sprite = rg.create( x * CELL_X, y * CELL_Y - z * CELL_Z, img );
        sprite._y = y;
        sprite._z = z;
        return sprite;
    }

    global.Cell = Cell;

} )( this );
