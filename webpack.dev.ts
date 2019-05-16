import { buildConfig } from './webpack.common'

let config = buildConfig('development', {
  publicPath: '/',
});

export default config;
