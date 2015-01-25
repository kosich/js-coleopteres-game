function _inherit ( P, proto ){
    var N = function N(){
        P.apply( this, arguments );
    };
    N.prototype = Object.create( P.prototype );
    N.prototype.constructor = N;
    _.extend(N.prototype, proto );
    return N;
}


