(function( global ){
    'use strict';

    function Cell ( x, y, z, renderGroup ){
        this.x = x;
        this.y = y;
        this.z = z;

        this.renderGroup = renderGroup;
    }

    _.extend( Cell.prototype, {
        add : function add ( Item ){
            if ( this.item )
                throw 'cell already has a block';

            var item = new Item();
            this.item = item;

            item.sprite = addSprite( this.renderGroup, item.img, this.x , this.y, this.z);
            return this;
        },
        remove : function remove(){
            console.log( this );
            this.item.sprite.destroy();
            return this;
        }
    } );

    function addSprite ( rg, img, x, y, z ){
        console.log( 'puting item to ', x, y, z );
        var sprite = rg.create( x * CELL_X, y * CELL_Y - z * CELL_Z, img );
        sprite._z = z;
        return sprite;
    }

    global.Cell = Cell;

})( this );
