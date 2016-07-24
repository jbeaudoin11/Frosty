"use strict";
//store user's session in req.session

var expressSession = require("express-session");
var mongoStore = require("connect-mongodb-session")(expressSession);

var Promise = require("promise");

module.exports = () => {
	var config = __Config.EXPRESS_SESSION_CONFIG;
	
	//use mongo to store the session
	config.store = new mongoStore({
		"uri" : __Config.MONGO_ADDRESS,
		"collection" : "_sessions",
	})
	
	__App.use(expressSession(config));

	return Promise.resolve();
} 
 