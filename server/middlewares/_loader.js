"use strict";
//Load all middlewares in order

var Promise = require("promise");

module.exports = class MiddlewareLoader {
	constructor() {
		
	}
	
	load() { //Can't use ScriptLoader cause order is very important

		return new Promise((res, rej) => {
			var files = (__Config.MIDDLEWARES || []).map((filename) => {
				return this.loader(filename);
			});

			if(files.length){
				Promise.all(files).then(res, rej);
			} else {
				res();
			}
		});
	}

	loader(filename) {
		return require(`./${filename}`)();
	}
}

