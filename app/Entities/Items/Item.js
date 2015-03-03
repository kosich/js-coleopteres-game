'use strict';

var common = require('../../common.js'),
    Basic = require('../Basic.js');

var Item = common._inherit( Basic, {
    _type: 'Item',
    _namespace: 'Items',

    activate: function () {}
} );

module.exports = Item;

