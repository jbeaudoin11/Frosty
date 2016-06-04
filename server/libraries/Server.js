"use strict";
var http = require("http");
var express = require("express");
var mongoose = require("mongoose");

//A simple wrapper of httpServer and express
//For automatisation of starting a server (middleware, routing, lib, etc...)

module.exports = class Server {
	constructor(config) {
		this.config = config;
		
		this.init();
	}
	
	start(callback) {
		//Start the http server
		//Carefull, loading order is important !
		
		//Connect to mongo via mongoose
		mongoose.connect(__Config.MONGO_ADDRESS);
		
		//load mongoose schemas in __Schemas
		this.schemasLoader.load();
		
		//load ressources in __Ressources
		this.ressourcesLoader.load();
		
		//load middlewares including routing
		this.middlewareLoader.load();
		
		//Create and start http server
		this.HttpServer = http.createServer(__App);
		this.HttpServer.listen(__Config.PORT, __Config.IP_ADDRESS, callback);
	}
	
	init() {
		//Define some globals and load some script to be use
		
		GLOBAL.__App = express();//express app
		GLOBAL.__Config = this.config;//all environment params
		
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
}