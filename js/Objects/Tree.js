( function ( global ) {
    'use strict';

    var BasicObject = global.Objects.BasicObject;

    _.extend( global.Objects, {
        TreeShort: _inherit( BasicObject, {
            img: 'Tree Short.png',
            _type: 'TreeShort'
        } ),
        TreeTall: _inherit( BasicObject, {
            img: 'Tree Tall.png',
            _type: 'TreeTall'
        } ),
        Bush: _inherit( BasicObject, {
            img: 'Tree Ugly.png',
            _type: 'Bush'
        } )
    } );

} )( this );
