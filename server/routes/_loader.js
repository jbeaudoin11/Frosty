"use strict";
//load all routes in files

var path = require("path");
var colors = require("colors");

module.exports = class RoutesLoader {
	constructor(router){
		this.router = router;
	}
	
	load() {
		var excludeFiles = [
			__filename,
		]
		
		__Libraries.ScriptLoader(__dirname, excludeFiles, (filename) => {
			var data = require(`./${filename}`);
			
			//test if the data is an array (maybe not the best way)
			if(typeof(data.forEach) == "function"){
				data.forEach((r) => {
					if(r.url != undefined){
						if(r.callback != undefined){
							this.router[path.basename(filename, ".js")](r.url, r.callback);
						} else {
							console.error(`ROUTE [${r.url}], NO CALLBACK`.red);
						}
					} else {
						console.error("ROUTE, NO URL".red);
					}
					
				})
			}
		})
	}
}