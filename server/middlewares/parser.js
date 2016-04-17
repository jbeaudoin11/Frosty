"use strict";

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

module.exports = () => {
	// __App.use(cookieParser(__Config.SESSION_SECRET));
	__App.use(cookieParser());
	
	
	__App.use(bodyParser.json({
		
	}));
	__App.use(bodyParser.raw({
		
	}));
	__App.use(bodyParser.text({
		
	}));
	__App.use(bodyParser.urlencoded({
		"extended" : true,
	}));
}