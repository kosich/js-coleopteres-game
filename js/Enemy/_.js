// Enemies our player must avoid
function Enemy ( speed ) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = speed;
    this.resetPower();
};

_.extend( Enemy.prototype, {
    canInhabbit : function ( type ){
        return type === 0;
    },
    resetPower : function(){
        this.power = 1000 / this.speed;
    },
    sprite : 'Enemy Bug.png',
    update : function(dt) {
        // console.log( 'time delta : ', dt, ' power ', this.power);
        this.power -= dt;
        if ( this.power < 0 ){
            world.move ( this, { x : 1, y : 0 });
            this.resetPower();
        }
    },
    destroy : function(){
        if ( this._onDestroy)
            this._onDestroy();
    },
    onDestroy : function( handler ){
        this._onDestroy = handler;
    }
} );
