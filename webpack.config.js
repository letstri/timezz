const path = require('path');

module.exports = (env) => ({
  entry: './timezz.js',
  mode: env,
  devtool: 'none',
  output: {
    filename: env === 'development' ? 'timezz.js' : 'timezz.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TimezZ',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
});
