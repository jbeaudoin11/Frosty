"use strict";
//load all ressources files used in routes

var path = require("path");
var colors = require("colors");

module.exports = class RessourcesLoader {
	constructor(){}
	
	load() {
		var ressources = {};
		
		__Libraries.ScriptLoader(__dirname, [__filename].concat(__Config.RESSOURCES_EXCLUDE_FILES || []), (filename) => {
			try {
				ressources[path.basename(filename, ".js")] = require(`./${filename}`);
			} catch (e) {
				console.error(`RESSOURCE [${filename}] : ${e.stack}`.red)
			}
		})

		return ressources;	
	}
}