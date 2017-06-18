const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        'index': './src/index.js'
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: [
                resolve('src')
            ]
        }]
    }
};