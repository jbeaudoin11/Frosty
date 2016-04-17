"use strict";
//load all routes in files

var path = require("path");
var colors = require("colors");

var ScriptLoader = require(__Config.SERVER_LIBRARIE_SCRIPT_LOADER_PATH);

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
					if(r.url != undefined){
						if(r.callbacks != undefined && r.callbacks.length > 0){
							this.router[path.basename(filename, ".js")](r.url, r.callbacks);
						} else {
							console.error(`ROUTE [${r.url}], NO CALLBACKS`.red);
						}
					} else {
						console.error("ROUTE, NO URL".red);
					}
					
				})
			}
		})
	}
}