const path = require('path');

module.exports = ({ development }) => ({
  entry: './timezz.ts',
  devtool: false,
  mode: development ? 'development' : 'production',
  output: {
    filename: development ? 'timezz.js' : 'timezz.min.js',
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
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
});
