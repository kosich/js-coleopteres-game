( function ( global ) {

    var b = {};

    b.Block = _inherit( Basic, {
        _type: 'Block',
        _namespace: 'Blocks'
    } );

    var Block = b.Block;

    b.Stone = _inherit( Block, {
        img: 'Stone Block.png',
        _type: 'Stone'
    } );
    b.Water = _inherit( Block, {
        img: 'Water Block.png',
        _type: 'Water'
    } );
    b.Grass = _inherit( Block, {
        img: 'Grass Block.png',
        _type: 'Grass'
    } );

    b.Brown = _inherit( Block, {
        img: 'Brown Block.png',
        _type: 'Brown'
    } );
    b.Wood = _inherit( Block, {
        img: 'Wood Block.png',
        _type: 'Wood'
    } );
    b.Dirt = _inherit( Block, {
        img: 'Dirt Block.png',
        _type: 'Dirt'
    } );
    b.Plain = _inherit( Block, {
        img: 'Plain Block.png',
        _type: 'Plain'
    } );
    b.Wall = _inherit( Block, {
        img: 'Wall Block.png',
        _type: 'Wall'
    } );

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
        'Tree Short.png',
        'Tree Tall.png',
        'Tree Ugly.png',
        'Window Tall.png'
    ]
} )( this );
