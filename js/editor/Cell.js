(function( global ){
    'use strict';

    function Cell (){

    }

    _.extend( Cell.prototype, {
        sprite : undefined,
        setSprite : function setSprite( sprite ){
            if ( this.sprite ){
                this.sprite.destroy();
            }
            this.sprite = sprite;
        },
        remove : function remove(){
            this.setSprite(  );
        }
    } );

    global.Cell = Cell;

})( this );
