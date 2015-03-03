'use strict';

var common = require('../../common.js'),
    BasicObject = require('./BasicObject.js');

var Trees = {
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

module.exports = Trees;
