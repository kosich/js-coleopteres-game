'use strict';

var _ = require( 'lodash' ),
    BasicObject = require('./BasicObject.js'),
    Rock = require('./Rock.js'),
    Trees = require('./Trees.js');

var Objects = {
    BasicObject : BasicObject,
    Rock : Rock
};

_.extend( Objects, Trees );

module.exports = Objects;

