module.exports = {
    mode: 'production',
    entry: './src/app/index.js',
    output: {
        path: `${__dirname}/src/public`,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            (compiler) => {
                const TerserPlugin = require('terser-webpack-plugin');
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        format: {
                            comments: false
                        }
                    }
                }).apply(compiler);
            }
        ]
    }
}