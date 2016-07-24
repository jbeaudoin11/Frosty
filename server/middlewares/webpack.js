"use strict";
//Use to add WebPack support to the server

var Promise = require("promise");

var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

//webpack create a bundle of all data for the client side
module.exports = () => {				
	var webpackConfig = require(__Config.WEBPACK_CONFIG_PATH);
	var webpackCompiler = webpack(webpackConfig);
	__App.use(webpackDevMiddleware(webpackCompiler, {
		"publicPath" : __Config.WEBPACK_OUTPUT_PUBLIC_PATH,
		"hot" : true,
		"noInfo" : true,
		"stats" : {
			"colors" : true,
		}
	}));
	__App.use(webpackHotMiddleware(webpackCompiler, {
		"log" : console.log
	}))	

	console.log("PASS");

	return Promise.resovle();
}