'use strict';

var path = require('path');

module.exports = {
    entry: {
      editor : './app/editor/main.js',
      game : './app/game/main.js',
    },
    output: {
        filename: './[name].entry.js'
    },
    module: {
        loaders: [
            // { test: /(phaser|phaser-debug)\.js$/i, loader: 'script' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ],
        // TODO: sourceMap seems not to be working
        // sourceMap : true
    },
    resolve: {
        alias: {
            'phaser': path.join(__dirname, 'phaser-faker.js'), //path.join(__dirname, 'node_modules/phaser/build/phaser.js'),
        },
        extensions: ['', '.js']
    },

    devtool: '#inline-source-map'
};
