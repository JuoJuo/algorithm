const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// COMMONJS
module.exports = {
    entry: {
        //key就是自己起的chunkname
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#id'  指定插入位置
                            // singleton: 'true'  只插一个style
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ],
            },
        ],
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ]
};