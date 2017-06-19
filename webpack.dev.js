const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        'example': './src/example.js'
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: resolve('src'),
        }, {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: false
            }
        }, {
            test: /\.png$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'example.html',
            template: path.join(__dirname, 'src/example.html')
        })
    ],
    devServer: {
        host: "0.0.0.0",
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 3000,
        disableHostCheck: true,
        noInfo: true
    }
};