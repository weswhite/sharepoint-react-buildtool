var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
  entry: [
    APP_DIR + '/index.jsx'
  ] ,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    inline:true,
    contentBase: './src',
    port: 3005
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
