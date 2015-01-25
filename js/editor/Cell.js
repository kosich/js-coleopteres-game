(function( global ){
    'use strict';

    function Cell ( x, y, renderGroup ){
        this.x = x;
        this.y = y;
        this.renderGroup = fieldrenderGroup;
    }

    _.extend( Cell.prototype, {
        add : function add ( Item ){
            if ( this.block )
                throw 'cell already has a block';

            this.block = new Item();
            block.sprite = this.renderGroup.create( x * CELL_W, y * CELL_H, this.block.img );

        },
        remove : function remove(){
            this.block.sprite.destroy();
            this.block = undefined;
        }
    } );

    global.Cell = Cell;

})( this );
