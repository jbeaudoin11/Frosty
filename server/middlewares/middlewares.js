"use strict";
//load all middleware in order
//the order in preMW and postMW is important

module.exports = class MiddlewareLoader {
	constructor(server){
		this.server = server;
		
		console.log(__App)
		
		this._preMW;//before routing
		this._postMW;//after routing
		
		this.initMwLists();
	}
	
	initMwLists() {
		this._preMW = [
			//helmet for security
			(server) => {
				var helmet = require("helmet");
				__App.use(helmet());		
			},
			//staticFiles
			(server) => {
				var expressStatic = require("express").static;
				__App.use(expressStatic(__Config.CLIENT_PUBLIC_PATH));		
			},
			//webpack
			(server) => {
				var webpack = require("webpack");
				var webpackDevMiddleware = require("webpack-dev-middleware");
				var webpackHotMiddleware = require("webpack-hot-middleware");
				
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
			},
		];

		this._postMW = [
			
		];
	}
	
	loadPreMiddlewares() {
		this._loadMiddlewares(this._preMW);
	}
	
	loadPostMiddlewares() {
		this._loadMiddlewares(this._postMW);
	}
	
	_loadMiddlewares(arr) {
		arr.forEach((fn) => {
			fn.bind(this)(this.server);
		})
	}
}

