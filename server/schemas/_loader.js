"use strict";
//load all schemas to use in mongoose

var path = require("path");
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

module.exports = class SchemasLoader {
	constructor(){}
	
	load() {
		var schemas = {};
				
		__Libraries.ScriptLoader(__dirname, [__filename].concat(__Config.SCHEMAS_EXCLUDE_FILES || []), (filename) => {
			var data = require(`./${filename}`);
			
			__Models[data.name] = mongoose.model(data.name, new Schema(data.schema));		
		})
	}
}