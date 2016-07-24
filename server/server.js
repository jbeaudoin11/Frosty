//Start the app
var Server = require("./libraries/Server.js");
var config = require("../config.js");

var server = new Server(config);
server.start()
	.then(() => {
		__Log.info(`SERVER IS UP : ${config.PUBLIC_IP_ADDRESS}:${config.PORT}`);	
	})
	.catch((err) => {
		__Log.error("SERVER IS DOWN, THERE IS AN ERROR")
		__Log.error(err);	
	})
