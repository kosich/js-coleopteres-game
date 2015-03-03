'use strict';

var common = require('../../common.js'),
    BasicObject = require('./BasicObject.js');

var Rock = common._inherit( BasicObject, {
    img: 'Rock.png',
    _type: 'Rock'
} );

module.exports = Rock;
