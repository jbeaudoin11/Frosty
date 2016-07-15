"use strict";
//User Schema to be use

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema =  new Schema({
	//typical local info
	"localData" : {
		"name"  : String,
		"email" : String,
		"profilePicture" : String,
		"bithday" : Number,
		"gender" : String,
		"phoneNumbers" : [String],
	},
	"username" : {"type" : String, "index" : true},
	"password" : String,
	
	//account ctrl
	"insertedDate" : {"type" : Number, "required" : true},
	"closedDate" : Number,
	"active" : {"type" : Boolean, "index" : true, "default" : true},
	
	//auth
	"provider" : {"type" : String, "index" : true, "required" : true},
	"providerId" : {"type" : String, "index" : true, "required" : true},
	"providerData" : { //should be use as default value if needed
		"name"  : {"type" : String, "required" : true},
		"email" : String,//can't be required because some providers doesn't give it
		"profilePicture" : String,
		"gender" : String,
		"provider" : String,
	},
	
	//app relative
	// "location" : ?,
	"language" : {"type" : String, "default" : "fr"},//TODO change for subdoc ?
	"languages" : [String],
}, {
	"strict" : true,
});

module.exports = () => {
	//Use to register the model of the Schema

	//Add the Schema to __Schemas
	__Schemas.user = userSchema;
	
	//Register the Schema as a model
	mongoose.model("User", userSchema);
}