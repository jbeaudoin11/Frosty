"use strict";
//load all schemas to use in mongoose

var logger = require("winston");

var path = require("path");
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

var ScriptLoader = require(__Config.LIBRARIE_SCRIPT_LOADER_PATH);

module.exports = class SchemasLoader {
	constructor(){
		
	}
	
	load() {
		ScriptLoader(__dirname, [__filename].concat(__Config.SCHEMAS_EXCLUDE_FILES || []), (filename) => {
			try {
				require(`./${filename}`)();
			} catch(err) {
				logger.error({
					"error" : `SCHEMAS [${filename}], CAN'T LOAD THE SCHEMA`.red,
					"catch" : err
				})
			}
		})
	}
}