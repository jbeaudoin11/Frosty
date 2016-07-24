"use strict";

var router = require("express").Router();
var RoutesLoader = require(__Config.SERVER_ROUTES_LOADER_PATH);

//routing
module.exports = () => {
	var routesLoader = new RoutesLoader(router);
	return routesLoader.load().then(() => {
		__App.use(router);
	})
}