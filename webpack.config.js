const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DeclarationBundlerPlugin = require('./tools/plugin/declaration-bundler-webpack-plugin.fix');

module.exports = {
    entry: {
        rxhttp: './src/index.ts'
    }, 
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'http',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    // {
                    //     loader: 'babel-loader'
                    // },
                    {
                        loader: 'ts-loader'
                    }
                ],
                include: [
                    path.resolve(__dirname, "src"),

                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new DeclarationBundlerPlugin({
            moduleName:'rxhttp',
            out:'./rxhttp.d.ts',
            excludedReferences: ['rxjs']
        })
    ],
    externals: [
        'rxjs',
        'request',
    ],
}