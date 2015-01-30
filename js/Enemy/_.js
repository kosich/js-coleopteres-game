// Enemies our player must avoid
var Enemy = _inherit( Basic, {
    img: 'Enemy Bug.png',
    _type : 'Enemy',

    canInhabbit: function ( type ) {
        return type === 0;
    },
    resetPower: function () {
        this.power = 1000 / this.speed;
    },
    update: function ( dt ) {
        // console.log( 'time delta : ', dt, ' power ', this.power);
        this.power -= dt;
        if ( this.power < 0 ) {
            world.move( this, {
                x: 1,
                y: 0
            } );
            this.resetPower();
        }
    },
    destroy: function () {
        if ( this._onDestroy )
            this._onDestroy();
    },
    onDestroy: function ( handler ) {
        this._onDestroy = handler;
    }
}, {
    init: function Enemy_init( speed ) {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.speed = speed;
        this.resetPower();
    }
} );
