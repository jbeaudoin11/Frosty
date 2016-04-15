"use strict";
var http = require("http");
var express = require("express");

//A simple wrapper of httpServer and express
//For automatisation of starting a server (middleware, routing, lib, etc...)

module.exports = class Server {
	constructor(config) {
		this.__App = express();//express app
		this.__Router = express.Router();//express routing
		this.__Config = config;//all environment params
		
		this.middleWareLoader = new (require(this.__Config.SERVER_MIDDLEWARES_LOADER_PATH))(this);
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
		this.HttpServer.listen(this.__Config.PORT, this.__Config.IP_ADDRESS, callback);
	}
	
	loadRoutes() {
		
	}
}