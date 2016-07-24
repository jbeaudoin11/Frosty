"use strict";
//Use to manage PassportJs module

var Promise = require("promise");
var passport = require("passport");

var Passport = require(__Config.LIBRARIE_PASSPORT_PATH);

module.exports = () => {
	Passport.initStrategies();
	
	__App.use(passport.initialize());
	__App.use(passport.session());

	return Promise.resolve();
}