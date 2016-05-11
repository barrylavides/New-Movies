var path = require('path');

module.exports = {
  entry: './client/entry.js',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './server/public/',
    filename: 'build.js'
  }
}
