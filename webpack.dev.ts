import buildConfig from './webpack.common';

const config = buildConfig('development', {
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
    },
    rules: [
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
});

export default config;
