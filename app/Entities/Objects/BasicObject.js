'use strict';

var common = require('../../common.js'),
    Basic = require('../Basic.js');

var BasicObject =  common._inherit( Basic, {
    _namespace: 'Objects',
    _type: 'BasicObject'
} );

module.exports = BasicObject;
