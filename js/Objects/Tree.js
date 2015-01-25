(function( global ){
    'use strict';

    var Basic = global.Objects.Basic;

    _.extend(global.Objects, { 
        TreeShort : _inherit( Basic , { img : 'Tree Short.png' } ) ,
        TreeTall : _inherit( Basic, { img : 'Tree Tall.png' } ) ,
        Bush : _inherit( Basic, { img : 'Tree Ugly.png' } ) 
    });

})(this);
