"use strict";
//load all schemas to use in mongoose

var path = require("path");
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

var ScriptLoader = require(__Config.LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class SchemasLoader {
	constructor(){}
	
	load() {
		var schemas = {};
				
		ScriptLoader(__dirname, [__filename].concat(__Config.SCHEMAS_EXCLUDE_FILES || []), (filename) => {
			require(`./${filename}`)();
		})
	}
}