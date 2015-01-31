define( [ 'common', 'Entities/Enemy/_' ], function ( common, Enemy ) {
    'use strict';

    var Player = common._inherit( Enemy, {
        img : 'Character Boy.png',
        _type : 'Player',

        canInhabbit : function canInhabbit( type ){
            return type in [ 0, 1 ];
        },
        resetDirection : function resetDirection(){
            this.movementDirection.x = 0;
            this.movementDirection.y = 0;
        },
        update : function update(dt) {
            if ( !this.movementDirection )
                return;

            world.move ( this, this.movementDirection );
            this.resetDirection();
        },
        handleInput : function handleInput( direction ) {
            if ( direction in directions )
                this.movementDirection = _.extend({}, directions[ direction ]);
        },
        die : function die(){
            console.warn( 'You\'ve just been bugged' );
            if ( this.onDeathHandler )
                this.onDeathHandler();
        },
        onDeath : function( handler ){
            this.onDeathHandler = handler;
        }
    } , {
        init: function Player_init(){
            Enemy.apply( this, arguments );
            this.movementDirection = { x: 0, y: 0 };
        }
    } );

    var directions = {
        left :  { x: -1  , y: 0 } ,
        up :    { x: 0 , y: -1  } ,
        right : { x: 1  , y: 0  } ,
        down :  { x: 0  , y: 1  }
    };

    return Player;

});
