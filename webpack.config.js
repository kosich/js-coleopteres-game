'use strict';

module.exports = {
    entry: './app/editor/main.js',
    output: {
        filename: './bundle.js'
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
