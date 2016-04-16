"use strict";

var helmet = require("helmet");

//helmet for security
module.exports = () => {
	__App.use(helmet());		
}