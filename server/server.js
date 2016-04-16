var Server = require("./libraries/Server.js");
var config = require("../config.js");

var server = new Server(config);
server.start(function() {
	console.log(`SERVER IS UP : ${config.PUBLIC_IP_ADDRESS}:${config.PORT}`);	
});
