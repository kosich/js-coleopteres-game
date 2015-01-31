define([ 'underscore', 'Entities/Objects/BasicObject', './Rock', './Trees' ], function( _, BasicObject, Rock, Trees){
    'use strict';

    var Objects = {
        BasicObject : BasicObject,
        Rock : Rock
    };

    _.extend( Objects, Trees );

    return Objects;

} );
