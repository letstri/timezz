const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = ({ development }) => ({
  entry: './timezz.ts',
  devtool: development ? 'inline-source-map' : false,
  mode: development ? 'development' : 'production',
  output: {
    filename: 'timezz.js',
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [new ESLintPlugin({ extensions: ['ts'] })],
});
