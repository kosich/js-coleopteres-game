
// CURSOR
function Cursor( sprite ){
    this.sprite = sprite;
    sprite.anchor.set( 0, .24 );
    this.x = 0;
    this.y = 0;
}

_.extend(Cursor.prototype, {
    move : function move ( dx, dy ){
        this.x += dx;
        this.y += dy;

        this.sprite.x = this.x * CELL_W;
        this.sprite.y = this.y * CELL_H;
    }
});

