"use strict";
//load all middleware in order

module.exports = class MiddlewareLoader {
	constructor() {}
	
	load() {
		//order is important !
		[
			"helmet.js",
			"expressStatic.js",
			"webpack.js",
			"routing.js",
		].forEach((filename) => {
			var fn = require(`./${filename}`);
			fn();
		})
	}
}

