"use strict";
//configuration for strategies in PassportJS

exports.facebook = {
	"scope" : [
		//typical
		"public_profile",
		"user_birthday",
		"email",
		
		//app relative
		"user_friends",
		"user_location",
	],
	"middlewareConfig" : {
		"successRedirect" : "/auth/success",
		"failureRedirect" : "/auth/failed",
		"enableProof" : true,
	},
	
	"strategyConfig" : {
		//need a better (secure) way to store thoses infos
		"clientID" : "1579685022360009",
		"clientSecret" : "76a38030c8d39bc3cac1322e5b357a62",
		"callbackURL" : `${__Config.HTTP_ADDRESS}/auth/facebook/callback`,
    	"profileFields": [
			"id",
			"displayName",
			"email",
			"picture",
			"gender",
		],
	},
}

exports.twitter = {
	"middlewareConfig" : {
		"successRedirect" : "/auth/success",
		"failureRedirect" : "/auth/failed",
		"enableProof" : true,
	},
	
	"strategyConfig" : {
		"consumerKey" : "qYwYN4WQ91oadhLDVsETOpUG3",
		"consumerSecret" : "A9UYcErjFyOitrlYjjGDsIYtzoxsv1YgMkmXffnh7yiyZdniXu",
		"callbackURL" : `${__Config.HTTP_ADDRESS}/auth/twitter/callback`,
	},
}