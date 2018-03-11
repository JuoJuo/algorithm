const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// COMMONJS
module.exports = {
    entry: {
        //key就是自己起的chunkname
        app:'./app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].[hash:5].js'
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};