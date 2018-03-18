const path = require('path')

module.exports = {
  entry: [
    './index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'static', 'js'),
    publicPath: '/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              'transform-object-rest-spread' // allows use of "{...obj, foo: bar}"
            ]
          }
        }]
      }
    ]
  },
  devtool: 'source-map'
}
