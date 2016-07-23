"use strict";
//load all routes in files

var Promise = require("promise");

var path = require("path");
var logger = require("winston");
var colors = require("colors");

var ScriptLoader = require(__Config.LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class RoutesLoader {
	constructor(router){
		this.router = router;
	}
	
	load() {
		var excludeFiles = [
			__filename,
		]
		
		ScriptLoader(__dirname, excludeFiles, (filename) => {
			var _routes = require(`./${filename}`);
			
			//test if _routes is an array (maybe not the best way)
			if(typeof(_routes.forEach) == "function"){
				_routes.forEach((route, index) => {

					//Test each route obj
					this._testRouteObject(route, index)
					.then(() => {
						this.router[path.basename(filename, ".js")](r.url, r.listeners);
					})
					.catch(this.loadingErrorHandler);

				})
			} else {
				//TODO trhow error
			}
		})
	}

	loadingErrorHandler(err) {
		//Handle loading errors
		logger.error(err.error.red);
	}

	_testRouteObject(route, index) {
		//Execute all tests on the route object

		return (
			this._testRouteObjectUrl(route, index)
				.then(this._testRouteObjectListeners.bind(this, route, index))
				.then(this._testRouteObjectListenersItems.bind(this, route, index))
		);
	}

	_testRouteObjectUrl(r, index) {
		//Test if the url is defined
		return new Promise((res, rej) => {
			if(r.url != undefined){
				res();
			} else {
				rej({
					"error" : `ROUTE [${index}] HAS NO URL`,
				});
			}
		});
	}

	_testRouteObjectListeners(r, index) {
		//Test if listeners is undefined and have at least 1 listener
		return new Promise((res, rej) => {
			if(r.listeners != undefined && r.listeners.length > 0){
				res();
			} else {
				rej({
					"error" : `ROUTE [${index} | ${r.url}], LISTENERS MUST BE AN ARRAY WITH AT LEAST 1 LISTENER`,
				});
			}
		});
	}

	_testRouteObjectListenersItems(r, index) {
		//Test if a listener in the listeners is undefined

		var i;
		var result = r.listeners.every((listener, _index) => {
			i = _index;
			return Boolean(listener) || false;
		})

		return new Promise((res, rej) => {
			if(result){
				res();
			} else {
				rej({
					"error" : `ROUTE [${index} | ${r.url}], LISTENER [${i}] IS UNDEFINED`,
				});
			}
		});
	}
}