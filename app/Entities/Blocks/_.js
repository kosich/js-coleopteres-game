define([ 'common', 'Entities/Blocks/Block', './Blocks', './Ramps' ], function( common, Block, Blocks, Ramps ){
    'use strict';

    var b = _.extend({ Block : Block }, Blocks, Ramps);
    console.log('blocks', b);
    return b;
} );
