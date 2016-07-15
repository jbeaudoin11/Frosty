"use strict";
//load all routes in files

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
			var data = require(`./${filename}`);
			
			//test if the data is an array (maybe not the best way)
			if(typeof(data.forEach) == "function"){
				data.forEach((r) => {
					this._testRouteObject(r, (err) => {
						if(err){
							logger.error(err.error.red);
						} else {
							this.router[path.basename(filename, ".js")](r.url, r.listeners);
						}
					})
				})
			}
		})
	}

	_testRouteObject(route, callback) {
		//Execute all tests on the route object

		this._testRouteObjectUrl(route, (err) => {
			if(err){
				callback(err)
			} else {
				this._testRouteObjectListeners(route, (err) => {
					if(err){
						callback(err)
					} else {
						this._testRouteObjectListenersItems(route, callback);
					}
				})
			}
		})
	}

	_testRouteObjectUrl(r, callback) {
		//Test if the url is defined

		if(r.url != undefined){
			callback();
		} else {
			callback({
				"error" : "ROUTE, NO URL",
			});
		}
	}

	_testRouteObjectListeners(r, callback) {
		//Test if listeners is undefined and have at least 1 listener

		if(r.listeners != undefined && r.listeners.length > 0){
			callback();
		} else {
			callback({
				"error" : `ROUTE [${r.url}], LISTENERS MUST BE AN ARRAY WITH AT LEAST 1 LISTENER`,
			});
		}
	}

	_testRouteObjectListenersItems(r, callback) {
		//Test if a listener in the listeners is undefined

		var i;
		var result = r.listeners.every((listener, index) => {
			i = index;
			return Boolean(listener) || false;
		})

		if(result){
			callback()
		} else {
			callback({
				"error" : `ROUTE [${r.url}], LISTENER [${i}] IS UNDEFINED`,
			});
		}
	}
}