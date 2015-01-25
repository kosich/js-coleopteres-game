(function( global ){
    'use strict';

    function Cell ( x, y, renderGroup ){
        this.x = x;
        this.y = y;
        this.renderGroup = renderGroup;
    }

    _.extend( Cell.prototype, {
        add : function add ( Item ){
            if ( this.block )
                throw 'cell already has a block';

            this.block = new Item();
            this.block.sprite = this.renderGroup.create( this.x * CELL_W, this.y * CELL_H, this.block.img );

        },
        remove : function remove(){
            this.block.sprite.destroy();
            this.block = undefined;
        }
    } );

    global.Cell = Cell;

})( this );
