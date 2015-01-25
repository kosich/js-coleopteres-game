function Cell (x, y, z){
    this.z = z;
    this.x = x;
    this.y = y;
    this.entities = [];
}

_.extend( Cell.prototype, {
    contains : function cell_contains ( Type ){
        return !!this.entities.find( function( e ){
            return e instanceof Type;
        } );
    },
    setBlock : function cell_setBlock ( Type ){
    },
    setItem : null
} );
