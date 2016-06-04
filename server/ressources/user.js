"use strict";

var mongoose = require("mongoose");
var User = mongoose.model("User");

exports.rebuildUserFromProviderData = (user, callback) => {
	//rebuild a user from PassportJS information
	
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
	user = JSON.parse(JSON.stringify(newUser));
	
	if(callback) {
		callback(null, user);
	} else {
		return user;
	}
};


exports.findOrCreateUserByProviderId = (providerId, provider, providerData, callback) => {
	// search or create a user from a provider
	
	User.findOneAndUpdate({
		providerId,
		provider,
		"active" : true
	}, {
		"$set" : {
			providerData
	}
	}, {
		"new" : true,
	})
	.exec((err, user) => {
		if(err) {
			callback(err);
		} else if(user) {
			//User is found, let send his info
			callback(null, this.filterDataFromUserToBeSend(user));
			
			//TODO udapte user's info with the new provider's data
		} else {
			//Create user
			this.createUserFromProviderData(providerId, provider, providerData, callback);
		}
	})
};

exports.createUserFromProvider = (providerId, provider, providerData, callback) => {
	//Create a user base on provider information
	var user = User({
		provider,
		providerId,
		providerData,
		"insertedDate" : Date.now(),
	});
	user.save((err, user) => {
		if(err){
			callback(err);
		} else {
			//Send the user's info
			callback(null, this.filterDataFromUserToBeSend(user));
		}
	});
}

exports.filterDataFromUserToBeSend = (user) => {
	//Let filter the data to send
	
	return {
		"id" : user.id
	}
}