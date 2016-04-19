"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = () => {
	__Models.User = mongoose.model("user", new Schema({
		//typical local info
		"localData" : {
			"name"  : String,
			"email" : String,
			"profilePicture" : String,
			"bithday" : Date,
			"gender" : String,
			"phoneNumbers" : [String],
		},
		"username" : {"type" : String, "index" : true},
		"password" : String,
		
		//account ctrl
		"insertedDate" : {"type" : Date, "required" : true},
		"closedDate" : Date,
		"active" : {"type" : Boolean, "index" : true, "default" : true},
		
		//auth
		"provider" : {"type" : String, "index" : true, "required" : true},
		"providerId" : {"type" : String, "index" : true, "required" : true},
		"providerData" : { //used as default value if needed
			"name"  : {"type" : String, "required" : true},
			"email" : String,//can't be required because some providers doesn't need it
			"profilePicture" : String,
			"gender" : String,
			"provider" : String,
		},
		
		//app relative
		// "location" : ?,
		"language" : {"type" : String, "default" : "fr"},
	}, {
		"strict" : true,
	}))
}