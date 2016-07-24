"use strict";
//A simple wrapper of httpServer and express
//For automatisation of starting a server (middleware, routing, lib, etc...)

var Promise = require("promise");

//Add color to console
require("colors");

var http = require("http");
var express = require("express");
var mongoose = require("mongoose");

module.exports = class Server {
	constructor(config) {
		this.config = config;

		//Since mongoose promise are deprecated lets set our default lib
		mongoose.Promise = Promise;
		
		this.init();
	}
	
	init() {
		//Define some globals and load some script to be use
		//Carefull, loading order is important !

		
		GLOBAL.__App = express();//express app
		GLOBAL.__Config = this.config;//all environment params

		//Get the global logger
		GLOBAL.__Log = require(__Config.LIBRARIE_LOGGER_PATH);
		
		//Schemas are use by mongoose
		GLOBAL.__Schemas = {};
		var SchemasLoader = require(__Config.SERVER_SCHEMAS_LOADER_PATH);
		this.schemasLoader = new SchemasLoader();
		
		//Ressources are use as route handler mainly
		GLOBAL.__Ressources = {};
		var RessourcesLoader = require(__Config.SERVER_RESSOURCES_LOADER_PATH);
		this.ressourcesLoader = new RessourcesLoader();
		
		//Middlewares are use by Express to manage
		var MiddlewareLoader = require(__Config.SERVER_MIDDLEWARES_LOADER_PATH);
		this.middlewareLoader = new MiddlewareLoader();
	}	
	
	start() {
		//Start the http server
		//Carefull, loading order is important !

		//Connect to mongo via mongoose
		return mongoose.connect(__Config.MONGOOSE_ADDRESS, __Config.MONGOOSE_OPTIONS || {})
		
		//load mongoose schemas in __Schemas
		.then(() => {//Context problem if we use directly .then(this.LOADER.load)
			return this.schemasLoader.load();
		})

		//load ressources in __Ressources
		.then(() => {
			return this.ressourcesLoader.load();
		})

		//load middlewares including routing
		.then(() => {
			return this.middlewareLoader.load();
		})

		//Create and start http server
		.then(this.startHttp.bind(this))
	}

	startHttp(){
		//Create and start http server
		return new Promise((res, rej) => {
			
			this.HttpServer = http.createServer(__App);
			this.HttpServer.listen(__Config.PORT, __Config.IP_ADDRESS, () => {
				res();
			});
		});
	}
}