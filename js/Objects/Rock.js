(function( global ){
    'use strict';

    function Rock (  ){ }
    Rock.prototype.sprite = 'Rock.png';

    _.extend(global, { 
        Rock : Rock
    });

})(this);

