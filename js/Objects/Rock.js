( function ( global ) {
    'use strict';

    _.extend( global.Objects, {
        Rock: _inherit( global.Objects.BasicObject, {
            img: 'Rock.png',
            _type: 'Rock'
        } )
    } );

} )( this );
