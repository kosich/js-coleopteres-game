(function( global ){
    'use strict';

    function TreeShort (  ){ }
    TreeShort.prototype.sprite = 'Tree Short.png';

    function TreeTall (  ){ }
    TreeTall.prototype.sprite = 'Tree Tall.png';

    function Bush (  ){ }
    Bush.prototype.sprite = 'Tree Ugly.png';


    _.extend(global, { 
        TreeShort : TreeShort,
        TreeTall : TreeTall,
        Bush : Bush
    });

})(this);
