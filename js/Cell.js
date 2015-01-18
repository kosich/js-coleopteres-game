var textures = {
    '0'  : 'Stone Block.png',
    '1'  : 'Grass Block.png',
    '2'  : 'Water Block.png'
};

function Cell (x, y, settings){
    this.type = settings.type;
    this.level = settings.level;
    this.x = x;
    this.y = y;
    this.sprite = textures[ this.type ];
    this.entities = [];
}

Cell.prototype.contains = function cell_contains ( Type ){
    return !!this.entities.find( function( e ){
        return e instanceof Type;
    } );
};


