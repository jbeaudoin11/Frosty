"use strict";
//load all ressources files used in routes

var path = require("path");
var colors = require("colors");

var ScriptLoader = require(__Config.LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class RessourcesLoader {
	constructor(){}
	
	load() {
		ScriptLoader(__dirname, [__filename].concat(__Config.RESSOURCES_EXCLUDE_FILES || []), (filename) => {
			// try {
				__Ressources[path.basename(filename, ".js")] = require(`./${filename}`);
			// } catch (e) {
			// 	console.error(`RESSOURCE [${filename}] : ${e.stack}`.red)
			// }
		})
	}
}