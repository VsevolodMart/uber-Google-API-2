'use strict';

module.exports = {
  entry: "./app/js/index",
  output: {
	//path: __dirname + "/dist",
	filename: "./app/js/build.js",
	library: "index"
  },
  watch: true,
  watchOptions: {
	aggregateTimeout: 100
  },
  devtool: 'source-map',
  module: {
	loaders: [
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
		  presets: ['es2015']
		}
	  }
	]
  }
};