'use strict';

var common = require('../../common.js'),
    Item = require( './Item.js' );

var Tellyport = common._inherit( Item, {} );

var types = {
    '0' : 'Gem Blue.png',
    '1' : 'Gem Green.png',
    '2' : 'Gem Orange.png'
};

var tellyports = {};

Object.keys( types ).forEach( function ( key ){
    tellyports[ 'Tellyport' + key ] = common._inherit( Tellyport, {
        img: types[ key ],
        _type : 'Tellyport' + key
    } );
} );

module.exports = tellyports;

