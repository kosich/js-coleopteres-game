'use strict';

var _ = require( 'lodash' ),
    Block = require('./Block.js'),
    Blocks = require('./Blocks.js'),
    Ramps  = require( './Ramps.js' );

var b = _.extend({ Block : Block }, Blocks, Ramps);

module.exports = b;
