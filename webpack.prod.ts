import { buildConfig } from './webpack.common'

let config = buildConfig('production', {
  publicPath: 'https://naranara.net/',
});

export default config;
