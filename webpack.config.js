const path = require('path');

module.exports = (env) => ({
  entry: './timezz.ts',
  mode: env,
  devtool: 'none',
  output: {
    filename: env === 'development' ? 'timezz.js' : 'timezz.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'timezz',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
});
