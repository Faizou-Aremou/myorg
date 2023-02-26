module.exports = (config, context) => {
  return {
    ...config,
    devtool: "eval-source-map",
    module: {
      ...config.module
    },
  };
};
