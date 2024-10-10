const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'), // Añadir el buffer fallback
        vm: require.resolve('vm-browserify'), // Añadir el polyfill para 'vm'
      };
      return webpackConfig;
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
