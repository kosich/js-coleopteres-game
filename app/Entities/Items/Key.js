'use strict';

var common = require('../../common.js'),
    Item = require( './Item.js' );

var Key = common._inherit( Item , {
    img : 'Key.png',
    _type : 'Key'
});

module.exports = Key;
