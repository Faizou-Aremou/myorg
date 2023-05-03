const { composePlugins, withNx, withWeb } = require('@nrwl/webpack');
const { merge } = require('webpack-merge');
module.exports = composePlugins(
  withNx(),
  withWeb(),
  (config, { options, context }) => {
    return merge(config,{
      devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            pathRewrite: { '^/api': '' },
            secure: false,
          },
        },
      },
      devtool: 'eval-source-map',
      module: {
        ...config.module,
      },
      experiments: {
        topLevelAwait: true,
      },
    });
  }
);
