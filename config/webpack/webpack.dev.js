const merge = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin');

const common = require('./webpack.common.js');

const plugins = [new NodemonPlugin()];

module.exports = merge.smart(
  {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    plugins,
  },
  common,
);
