import * as webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export function buildConfig(
    mode: string,
    options: {
        publicPath: string,
    }
    ) {
    let config: webpack.Configuration = {
        mode: mode,
        entry: "./src/index.tsx",
        output: {
            filename: "bundle.js",
            path: `${__dirname}/dist`,
            publicPath: options.publicPath,
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
            modules: [
                `${__dirname}/src`,
                "node_modules"
            ]
        },
        
        devServer: {historyApiFallback: true,},

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'babel-loader'.
                { test: /\.(ts|js)x?$/, exclude: /node_modules/, loader: "babel-loader" },

                {
                    test: /\.ya?ml$/,
                    use: [
                        { loader: 'json-loader' },
                        { loader: 'yaml-loader' },
                        { loader: 'yaml-lint-loader' },
                    ],
                },

                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader"    // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader"      // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader"     // compiles Sass to CSS
                        }
                    ],
                },

                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name]_[hash:7].[ext]',
                            }
                        },
                    ],
                },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ],
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${__dirname}/public/index.html`
            }),
            new CopyWebpackPlugin([
              { from: `${__dirname}/public/favicon`, to: 'favicon' }
            ]),
        ],
        node: {
          fs: 'empty'
        }
    };
    return config;
};
