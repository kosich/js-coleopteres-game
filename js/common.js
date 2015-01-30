(function ( global ){
    'use strict';

    global._inherit = _inherit;
    global.Basic = Basic;

    ///{{{ just usual inherit sugar
    function _inherit ( P, proto ){
        var N = function N(){
            P.apply( this, arguments );
        };
        N.prototype = Object.create( P.prototype );
        N.prototype.constructor = N;
        // Object.defineProperty( N.prototype, 'constructor', {
        //     value : N,
        //     enumerable : false
        // } );
        _.extend(N.prototype, proto );
        return N;
    }
    //}}}

    /// Basic to all map entities {{{
    function Basic (){ }
    Basic.prototype.typeDefinition = function(){
        return { type: this._type, namespace : this._namespace };
    };

    Basic.prototype.serialyze = function serialyze(){
        var result = {};
        result.type = this.typeDefinition();
        return result;
    };

    // STATIC METHODS
    // this is wicked,
    // consider refactoring to some fabric or similar
    Basic.deserialyze = function deserialyze( serialyzed ){
        var typeDefinition = serialyzed.type;
        if ( !typeDefinition )
            throw 'cannot deserialyze empty type';

        try{
            var object =  new global[ typeDefinition.namespace ][ typeDefinition.type ]();
        } catch ( exc ){
            console.error('failed to instance', typeDefinition );
            // throw exc;
        }
        return object;
    };
    //}}}

})( this );
