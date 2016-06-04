"use strict";
//make some utilites fonction to the PassportJS

var colors = require("colors");
var passport = require("passport");
var passportConfig = require(__Config.PASSPORT_CONFIG_PATH);

var FacebookStrategy = require("passport-facebook").Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;

exports.buildAuthLoginMiddleware = (strategy) => {
	//Build the middleware, for a strategy,  to use when login 
	
	var strat = passportConfig[strategy];
	
	if(strat != null) {
		return passport.authenticate(strategy, {"scope" : strat.scope || []});
	} else {
		throw new Error(`PASSPORT STRATEGY [${strategy}] IS NOT DEFINE`.red);
	}		
}

exports.buildAuthCallbackMiddleware = (strategy) => {
	//Build the callback middleware, for a strategy, to use when the login is done
	
	var strat = passportConfig[strategy];
	
	if(strat != null) {
		return passport.authenticate(strategy, strat.middlewareConfig);
	} else {
		throw new Error(`PASSPORT STRATEGY [${strategy}] IS NOT DEFINE`.red);
	}		
}

exports.initStrategies = () => {
	//define stragies to use like facebook and twitter
	
	var facebook = passportConfig.facebook;
	passport.use("facebook", new FacebookStrategy(
		facebook.strategyConfig,
		(acessToken, refreshToken, profile, callback) => {
			//findOrCreateUser from provider's data
			this.findOrCreateUserById(profile, callback);
		}		
	))
	
	var twitter = passportConfig.twitter;
	passport.use("twitter", new TwitterStrategy(
		twitter.strategyConfig,
		(acessToken, refreshToken, profile, callback) => {
			this.findOrCreateUserById(profile, callback);
		}		
	))
	
	this.initSerialisation();
}

this.findOrCreateUserById = (profile, callback) => {
	var User = __Ressources.user;
	var rebuiltUser = User.rebuildUserFromProviderData(profile);
	User.findOrCreateUserByProviderId(rebuiltUser.providerId, rebuiltUser.provider, rebuiltUser, (err, user) => {
		//the same user as serializeUser(user, done)
		callback(err, user);
	})
}

this.initSerialisation = () => {
	
	//store importants informations to the session
	//set req.session.passport.user
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	//find the user in database to be store in req.user
	passport.deserializeUser(function(obj, done) {
		//TODO
		done(null, obj);
	});
}