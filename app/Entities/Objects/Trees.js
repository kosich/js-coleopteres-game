define([ 'common', 'Entities/Objects/BasicObject' ], function( common, BasicObject ){
    'use strict';

    return {
        TreeShort: common._inherit( BasicObject, {
            img: 'Tree Short.png',
            _type: 'TreeShort'
        } ),
        TreeTall: common._inherit( BasicObject, {
            img: 'Tree Tall.png',
            _type: 'TreeTall'
        } ),
        Bush: common._inherit( BasicObject, {
            img: 'Tree Ugly.png',
            _type: 'Bush'
        } )
    };

} );
