'use strict';

var LOCAL_STORAGE_LEVEL_KEY = 'editingLevel';

module.exports = {
    save: function saveLevel( data ) {
        localStorage.setItem( LOCAL_STORAGE_LEVEL_KEY, JSON.stringify( data ) );
    },

    load: function loadLevel() {
        var value = localStorage.getItem( LOCAL_STORAGE_LEVEL_KEY );
        if ( !value ){
            var level = require( './levels/one.json' );

            console.log( level );
            throw 'couldnt find any level';
        }

        return JSON.parse( value );
    }
};
