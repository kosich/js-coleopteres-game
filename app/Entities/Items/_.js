'use strict';

var _ = require( 'lodash' ),
    Item = require( './Item.js' ),
    Key = require( './Key.js' ),
    tellyports = require( './Tellyport.js' );

var Items = {
    Item : Item,
    Key : Key
};

// add tellyports [0,1,2]
_.extend( Items, tellyports );

module.exports = Items;

