'use strict';

var LOCAL_STORAGE_LEVEL_KEY = 'editingLevel';

module.exports = {

    save( data ) {
        localStorage.setItem( LOCAL_STORAGE_LEVEL_KEY, JSON.stringify( data ) );
    },

    load() {
        var value = localStorage.getItem( LOCAL_STORAGE_LEVEL_KEY );
        if ( !value ){
            // TODO: remove this shit
            try{
                var req = new XMLHttpRequest();
                req.open('GET', '/app/levels/one.json', false);
                req.send();
                value = req.response;
            } catch( exc ){
                throw 'couldnt find any level';
            }
        }

        return JSON.parse( value );
    }

};

