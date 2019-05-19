import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const isProd = (mode: string): boolean => {
    return mode === 'production';
};


function buildConfig(mode: string, options: any): webpack.Configuration {
    const config: webpack.Configuration = {
        mode: mode,
        entry: './src/index.tsx',
        output: {
            filename: 'bundle.js',
            path: `${__dirname}/dist`,
            publicPath: '/',
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            modules: [
                `${__dirname}/src`,
                'node_modules',
            ],
        },

        module: {
            rules: [
                {test: /\.(ts|js)x?$/, exclude: /node_modules/, loader: 'babel-loader'},

                {
                    test: /\.ya?ml$/,
                    use: [
                        {loader: 'json-loader'},
                        {loader: 'yaml-loader'},
                        {loader: 'yaml-lint-loader'},
                    ],
                },

                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader', // creates style nodes from JS strings
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                        },
                        {
                            loader: 'sass-loader', // compiles Sass to CSS
                        },
                    ],
                },

                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name]_[hash:7].[ext]',
                            },
                        },
                    ],
                },
            ],
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: `${__dirname}/public/index.html`,
            }),
            new CopyWebpackPlugin([{
                from: `${__dirname}/public/favicon`, to: 'favicon',
            }]),
        ],

        node: {
            fs: 'empty',
        },
    };

    if (isProd(mode)) {
        config.devtool = false;
    } else {
        config.devtool = options.devtool;
        config.devServer = {
            historyApiFallback: true,
            disableHostCheck: true,
            host: options.devServer.host,
            port: options.devServer.port,
        };
        config.module.rules =
            (config.module.rules || []).concat(options.rules || []);
    }

    return config;
}


export default buildConfig;
