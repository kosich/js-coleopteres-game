'use strict';

var Entities = require('./_.js');

function Basic() {}

Basic.prototype.typeDefinition = function () {
    return {
        type: this._type,
        namespace: this._namespace
    };
};

Basic.prototype.serialyze = function serialyze() {
    var result = {};
    result.type = this.typeDefinition();
    return result;
};

// STATIC METHODS
// this is wicked,
// consider refactoring to some fabric or similar
Basic.deserialyze = function deserialyze( serialyzed ) {
    var typeDefinition = serialyzed.type,
        ns,
        object;
    if ( !typeDefinition )
        throw 'cannot deserialyze empty type';

    try {
        ns = Entities[ typeDefinition.namespace ];
        object = new ( ns || Entities )[ typeDefinition.type ]();
    } catch ( exc ) {
        console.warn( 'failed to deserialyze item', Entities, typeDefinition );
        throw exc;
    }
    return object;
};

module.exports = Basic;
