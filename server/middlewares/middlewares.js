"use strict";
//load all middleware in order
//the order in preMW and postMW is important


var preMW = [
	//staticFiles
	(server) => {
		var expressStatic = require("express").static;
		server.__App.use(expressStatic(server.__Config.CLIENT_PUBLIC_PATH));		
	},
	//webpack
	(server) => {
		// console.log(server.__Config)
		var webpack = require("webpack");
		var webpackDevMiddleware = require("webpack-dev-middleware");
		var webpackHotMiddleware = require("webpack-hot-middleware");
		
		var webpackConfig = require(server.__Config.WEBPACK_CONFIG_PATH);
		var webpackCompiler = webpack(webpackConfig);
		server.__App.use(webpackDevMiddleware(webpackCompiler, {
			"publicPath" : server.__Config.WEBPACK_OUTPUT_PUBLIC_PATH,
			"hot" : true,
			"noInfo" : true,
			"stats" : {
				"colors" : true,
			}
		}));
		server.__App.use(webpackHotMiddleware(webpackCompiler, {
			"log" : console.log
		}))	
	},
];

var postMW = [
	
];

module.exports = class MiddlewareLoader {
	constructor(server){
		this.server = server;
	}
	
	loadPreMiddlewares() {
		this._loadMiddlewares(preMW);
	}
	
	loadPostMiddlewares() {
		this._loadMiddlewares(postMW);
	}
	
	_loadMiddlewares(arr) {
		arr.forEach((fn) => {
			fn(this.server);
		})
	}
}

