
module.exports = (config, context) => {
  return {
    ...config,
    devtool: 'source-map',
    module: {
      ...config.module
    },
  };
};
