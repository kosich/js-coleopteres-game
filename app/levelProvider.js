define( function () {

    var LOCAL_STORAGE_LEVEL_KEY = 'editingLevel';

    return {
        save: function saveLevel( data ) {
            localStorage.setItem( LOCAL_STORAGE_LEVEL_KEY, JSON.stringify( data ) );
        },

        load: function loadLevel() {
            var value = localStorage.getItem( LOCAL_STORAGE_LEVEL_KEY );
            if ( !value )
                throw 'couldnt find any level';

            return JSON.parse( value );
        }
    };

} );
