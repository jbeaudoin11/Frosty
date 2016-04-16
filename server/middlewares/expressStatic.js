"use strict";
var expressStatic = require("express").static;

//staticFiles deserve public files
module.exports = () => {
	__App.use(expressStatic(__Config.CLIENT_PUBLIC_PATH));		
}