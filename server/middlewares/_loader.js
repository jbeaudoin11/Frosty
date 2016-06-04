"use strict";
//Load all middlewares in order

//Can't use ScriptLoader cause order is very important

module.exports = class MiddlewareLoader {
	constructor() {
		
	}
	
	load() {
		(__Config.MIDDLEWARES || []).forEach((filename) => {
			var fn = require(`./${filename}`);
			fn();
		})
	}
}

