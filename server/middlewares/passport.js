"use strict";
var passport = require("passport");

var Passport = require(__Config.SERVER_LIBRARIE_PASSPORT_PATH);

module.exports = () => {
	Passport.initStrategies();
	
	__App.use(passport.initialize());
	__App.use(passport.session());
}