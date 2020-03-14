const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ConfigWebpackPlugin = require('config-webpack');
const dotenv = require('dotenv');

dotenv.config();

const resolvePlugins = [
  new TsconfigPathsPlugin({
    configFile: path.resolve(__dirname, '../../tsconfig.json'),
  }),
];

const plugins = [
  new webpack.ProgressPlugin(),
  new ConfigWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env.config': JSON.stringify(require('config')),
  }),
];

const tsLoader = {
  test: /\.(ts|js)$/,
  exclude: /node_modules/,
  use: {
    loader: 'ts-loader',
  },
};

const extensions = ['.js', '.ts'];

module.exports = {
  target: 'node',
  entry: [path.resolve(__dirname, '../../src/index.ts')],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../../dist'),
  },
  module: {
    rules: [tsLoader],
  },
  resolve: {
    extensions,
    plugins: resolvePlugins,
  },
  plugins,
};
