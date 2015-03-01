'use strict';

var common = require('../../common.js'),
    Block =  require('./Block.js');

module.exports = {
    Stone : common._inherit( Block, { img: 'Stone Block.png', _type: 'Stone' } ),
    Water : common._inherit( Block, { img: 'Water Block.png', _type: 'Water' } ),
    Grass : common._inherit( Block, { img: 'Grass Block.png', _type: 'Grass' } ),
    Brown : common._inherit( Block, { img: 'Brown Block.png', _type: 'Brown' } ),
    Wood : common._inherit( Block, { img: 'Wood Block.png', _type: 'Wood' } ),
    Dirt : common._inherit( Block, { img: 'Dirt Block.png', _type: 'Dirt' } ),
    Plain : common._inherit( Block, { img: 'Plain Block.png', _type: 'Plain' } ),
    Wall : common._inherit( Block, { img: 'Wall Block.png', _type: 'Wall' } )
};
