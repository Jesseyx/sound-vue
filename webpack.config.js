var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    publicPath: '/js/',
    path: path.join(__dirname, 'server', 'public', 'js'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
    ],
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {

} else {
  module.exports.devtool = '#source-map';
  module.exports.devServer = {
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:8081'
    },
  };
}
