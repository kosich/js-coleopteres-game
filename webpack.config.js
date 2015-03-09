'use strict';

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
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ],
        // TODO: sourceMap seems not to be working
        // sourceMap : true
    },
    devtool: "#inline-source-map"
};
