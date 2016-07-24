"use strict";
//load all routes in files

var Promise = require("promise");

var path = require("path");

var ScriptLoader = require(__Config.LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class RoutesLoader {
	constructor(router){
		this.router = router;
	}
	
	load() {
		//Exclude this file
		var excludeFiles = [
			__filename,
		]
		
		//Load all file in the folder
		return ScriptLoader(__dirname, excludeFiles, this.loader.bind(this));
	}

	loader(filename) {
		//Load one file
		return new Promise((res, rej) => {
			var _routes = require(`./${filename}`);
			
			//test if _routes is an array (maybe not the best way)
			if(typeof(_routes.forEach) == "function"){

				//Generate promises
				var routes = _routes.map((route, index) => {
					return this._loadRoute(filename, route, index);
				});

				//Process all promise
				Promise.all(routes).then(res, rej);
			} else {

				//Warn the user
				__Log.warn(`ROUTE FILE [${filename}] SKIPED, IT'S NOT AN ARRAY`);

				//Resolve
				res();
			}
		})
	}

	_loadRoute(filename, route, index) {
		//Test and Load a route object in the router
	
		return (
			//Test the route
			this._testRouteObjectUrl(route, index)
				.then(this._testRouteObjectListeners.bind(this, route, index))
				.then(this._testRouteObjectListenersItems.bind(this, route, index))
				.then(() => {					
					//Register listeners
					this.router[path.basename(filename, ".js")](route.url, route.listeners);
				})
		);
	}

	_testRouteObjectUrl(r, index) {
		//Test if the url is defined

		if(r.url != undefined){
			return Promise.resolve();
		} else {
			return Promise.reject(new Error(`ROUTE [#${index}] HAS NO URL`));
		}
	}

	_testRouteObjectListeners(r, index) {
		//Test if listeners is undefined and have at least 1 listener
		
		if(r.listeners != undefined && r.listeners.length > 0){
			return Promise.resolve();
		} else {
			return Promise.reject(new Error(`ROUTE [#${index} | ${r.url}], LISTENERS MUST BE AN ARRAY WITH AT LEAST 1 LISTENER`));
		}
	}

	_testRouteObjectListenersItems(r, index) {
		//Test if a listener in the listeners is undefined

		var i;
		var result = r.listeners.every((listener, _index) => {
			i = _index;
			return Boolean(listener) || false;
		})

		if(result){
			return Promise.resolve();
		} else {
			return Promise.reject(new Error(`ROUTE [#${index} | ${r.url}], LISTENER [${i}] IS UNDEFINED`));
		}
	}
}