"use strict";

var mongoose = require("mongoose");
var User = mongoose.model("User");


exports.loggedIn = (req, res) => {
	// console.log(req.session)
	var user = req.user;
	
	User.findById(user.id)
	.exec((err, user) => {
		
		if(err) {
			res.json({"err" : err});
		} else {		
			res.send(JSON.stringify(user, null));
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