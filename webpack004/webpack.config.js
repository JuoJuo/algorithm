const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// COMMONJS
module.exports = {
    entry: {
        //key就是自己起的chunkname
        pageA:'./pageA.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].js'
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};