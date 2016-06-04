"use strict";

var mongoose = require("mongoose");
var User = mongoose.model("User");


exports.loggedIn = (req, res) => {
	//User is logged in
	
	var user = req.user;
	
	User.findById(user.id)
	.exec((err, user) => {
		if(err) {
			res.json({"err" : err});
		} else {		
			res.send(JSON.stringify(user));
		}
	})
}

exports.loginFailed = (req, res) => {
	//An error occured while the user was trying to login
	
	res.json({"err" : "login failed"})
}

exports.logout = (req, res) => {
	//Lets logout the user
	
	req.logout();
	req.session.destroy();
	res.json({"value" : "logged out"})
}