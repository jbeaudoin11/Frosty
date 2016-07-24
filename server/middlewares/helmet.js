"use strict";

var helmet = require("helmet");
var Promise = require("promise");

//helmet for security
module.exports = () => {
	__App.use(helmet());

	return Promise.resolve();	
}