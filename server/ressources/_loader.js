"use strict";
//load all ressources files used in routes
var Promise = require("promise");

var path = require("path");
var colors = require("colors");

var ScriptLoader = require(__Config.LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class RessourcesLoader {
	constructor(){}
	
	load() {
		return ScriptLoader(__dirname, [__filename].concat(__Config.RESSOURCES_EXCLUDE_FILES || []), this.loader.bind(this))
	}

	loader(filename) {
		__Ressources[path.basename(filename, ".js")] = require(`./${filename}`);

		return Promise.resolve();
	}
}