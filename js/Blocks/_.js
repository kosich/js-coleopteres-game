( function( global ){

    var b = {
        Basic : Block
    };

    function Block (){ }

    b.Stone = _inherit( Block, { img: 'Stone Block.png' } );
    b.Water = _inherit( Block, { img: 'Water Block.png' } );
    b.Grass = _inherit( Block, { img: 'Grass Block.png' } );

    b.Brown = _inherit( Block, { img: 'Brown Block.png' } );
    b.Wood  = _inherit( Block, { img: 'Wood Block.png'  } );
    b.Dirt  = _inherit( Block, { img: 'Dirt Block.png'  } );
    b.Plain = _inherit( Block, { img: 'Plain Block.png' } );
    b.Wall  = _inherit( Block, { img: 'Wall Block.png'  } );

    global.Blocks = b;



var imgs = [
'Brown Block.png',
'Dirt Block.png',
'Grass Block.png',
'Plain Block.png',
'Stone Block Tall.png',
'Stone Block.png',
'Wall Block Tall.png',
'Wall Block.png',
'Water Block.png',
'Wood Block.png',

'Character Boy.png',
'Character Cat Girl.png',
'Character Horn Girl.png',
'Character Pink Girl.png',
'Character Princess Girl.png',

'Door Tall Closed.png',
'Door Tall Open.png',

'Chest Closed.png',
'Chest Lid.png',
'Chest Open.png',
'Enemy Bug.png',
'Gem Blue.png',
'Gem Green.png',
'Gem Orange.png',
'Heart.png',
'Key.png',

// 'PlanetCuteShadowMockup.jpg',
// 'PlanetCuteShadowTest.png',

'Ramp East.png',
'Ramp North.png',
'Ramp South.png',
'Ramp West.png',
'Rock.png',
'Roof East.png',
'Roof North East.png',
'Roof North West.png',
'Roof North.png',
'Roof South East.png',
'Roof South West.png',
'Roof South.png',
'Roof West.png',
'Selector.png',
'Shadow East.png',
'Shadow North East.png',
'Shadow North West.png',
'Shadow North.png',
'Shadow Side West.png',
'Shadow South East.png',
'Shadow South West.png',
'Shadow South.png',
'Shadow West.png',
'SpeechBubble.png',
'Star.png',
'Thumbs.db',
'Tree Short.png',
'Tree Tall.png',
'Tree Ugly.png',
'Window Tall.png'
]
} )( this );
