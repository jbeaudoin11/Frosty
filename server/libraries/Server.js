"use strict";
var http = require("http");
var express = require("express");
var mongoose = require("mongoose");

//A simple wrapper of httpServer and express
//For automatisation of starting a server (middleware, routing, lib, etc...)

module.exports = class Server {
	constructor(config) {
		this.config = config;
		this.defineGlobals();
		
		var MiddlewareLoader = require(__Config.SERVER_MIDDLEWARES_LOADER_PATH);
		this.middlewareLoader = new MiddlewareLoader();
		
		var SchemasLoader = require(__Config.SERVER_SCHEMAS_LOADER_PATH);
		this.schemasLoader = new SchemasLoader();
	}
	
	start(callback) {
		//Connect to mongo via mongoose
		mongoose.connect(__Config.MONGO_ADDRESS);
		//load mongoose schemas, models are in __Models
		this.schemasLoader.load();
		
		//load middlewares including routing
		this.middlewareLoader.load();
		
		//Create and start http server
		this.HttpServer = http.createServer(__App);
		this.HttpServer.listen(__Config.PORT, __Config.IP_ADDRESS, callback);
	}
	
	//globals
	defineGlobals() {
		GLOBAL.__App = express();//express app
		GLOBAL.__Config = this.config;//all environment params
		GLOBAL.__Models = {};//for mongoose
		
		var RessourcesLoader = require(__Config.SERVER_RESSOURCES_LOADER_PATH);
		var ressourcesLoader = new RessourcesLoader();
		GLOBAL.__Ressources = ressourcesLoader.load();
	}
}