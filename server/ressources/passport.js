"use strict";
var passport = require("passport");

exports.loggedIn = (req, res) => {
	// console.log(req.session)
	var user = req.user;
	__Models.User.findOne({"_id" : user.id}, (err, u) => {
		
		if(err) {
			res.json({"err" : err});
		} else {		
			res.send(JSON.stringify(u, null));
		}
			
	})
}

exports.loginFailed = (req, res) => {
	res.json({"err" : "login failed"})
}

exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.json({"value" : "logged out"})
}