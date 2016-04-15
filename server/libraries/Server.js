"use strict";
var http = require("http");
var express = require("express");

//A simple wrapper of httpServer and express
//For automatisation of starting a server (middleware, routing, lib, etc...)

//globals
var __App;
var __Router;
var __Config;

module.exports = class Server {
	constructor(config) {
		this.setGlobals(config);
		
		this.middleWareLoader = new (require(__Config.SERVER_MIDDLEWARES_LOADER_PATH))(this);
	}
	
	start(callback) {
		//load all middlewares who need to be before the routing
		this.middleWareLoader.loadPreMiddlewares();
		
		//load routing
		this.loadRoutes();
		
		//load all middlewares who need to be before the routing
		this.middleWareLoader.loadPostMiddlewares();
		
		//Create and start http server
		this.HttpServer = http.createServer(this.__App);
		this.HttpServer.listen(__Config.PORT, __Config.IP_ADDRESS, callback);
	}
	
	loadRoutes() {
		
	}
	
	setGlobals(config) {
		__App = express();//express app
		__Router = express.Router();//express routing
		__Config = config;//all environment params
	}
}