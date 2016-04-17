"use strict";

var mongoose = require("mongoose");

//rebuild a user from PassportJS information
exports.rebuildUserFromProvider = (user, callback) => {
	var newUser = {
		"providerId" : user.id,
		"name" : user.displayName,
		"gender" : user.gender,
		"provider" : user.provider,
	}
	
	if(user.emails && user.emails.length > 0){
		newUser.email = user.emails[0].value;
	}
	if(user.photos && user.photos.length > 0){
		newUser.profilePicture = user.photos[0].value;
	}
	
	// remove undefined fields
	return JSON.parse(JSON.stringify(newUser));
};

// search or create a user from a provider
exports.findOrCreateUserById = (providerId, provider, providerData, callback) => {
	__Models.User.findOneAndUpdate({providerId, provider, "active" : true}, {"$set" : {providerData}}, "id", (err, user) => {
		if(err) {
			//an error occurred
			callback(err);
		} else {
			if(user) {
				//user is found
				callback(err, {"id" : user.id});
			} else {
				// need to create the user
				__Models.User.create({
					provider,
					providerId,
					providerData,
					"insertedDate" : "" + Date.now(),
				}, (err, u) => {
					callback(err, {"id" : u.id});
				});
			}
		}
	});
};