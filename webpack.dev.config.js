const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')

baseConfig.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

baseConfig.mode = 'development'

baseConfig.devServer = { contentBase: path.resolve('static') }

module.exports = baseConfig
