"use strict";
//load all ressources files used in routes

var path = require("path");
var colors = require("colors");

var ScriptLoader = require(__Config.SERVER_LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class RessourcesLoader {
	constructor(){}
	
	load() {
		var ressources = {};
		
		ScriptLoader(__dirname, [__filename].concat(__Config.RESSOURCES_EXCLUDE_FILES || []), (filename) => {
			// try {
				ressources[path.basename(filename, ".js")] = require(`./${filename}`);
			// } catch (e) {
			// 	console.error(`RESSOURCE [${filename}] : ${e.stack}`.red)
			// }
		})

		return ressources;	
	}
}