"use strict";
//load all middleware in order

module.exports = class MiddlewareLoader {
	constructor() {}
	
	load() {
		(__Config.MIDDLEWARES || []).forEach((filename) => {
			var fn = require(`./${filename}`);
			fn();
		})
	}
}

