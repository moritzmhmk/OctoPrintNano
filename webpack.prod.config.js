const webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')

baseConfig.devtool = 'cheap-module-source-map'

baseConfig.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin()
]

baseConfig.mode = 'production'

module.exports = baseConfig
