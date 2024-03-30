const webpack = require('webpack');
const process = require('process');

module.exports = function override(config, env) {
  // Add fallback for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    os: require.resolve('os-browserify'),
    vm: require.resolve('vm-browserify'),
    path: require.resolve('path-browserify'),
    process: require.resolve('process/browser'),
  };

  // Add polyfills for Node.js core modules
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Set 'node' value in the global context for correct behavior
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  );

  return config;
}