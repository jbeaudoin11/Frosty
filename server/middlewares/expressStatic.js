"use strict";
var expressStatic = require("express").static;

var Promise = require("promise");

//staticFiles deserve public files
module.exports = () => {
	__App.use(expressStatic(__Config.CLIENT_PUBLIC_PATH));	

	return Promise.resolve();	
}