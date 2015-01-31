requirejs.config( {
    baseUrl: '/app/',
    paths: {
        'underscore' : '../bower_components/underscore/underscore',
        'phaser'     : '../bower_components/phaser-official/build/phaser',
        'Basic'      : './Entities/Basic'
        // 'Entities' : 'Entities/_'
    },
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    }
} );
requirejs( [ 'game/main' ] );
