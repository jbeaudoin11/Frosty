//Configure the bunyan logger


//Define the logger's options
var options = {
	"name" : __Config.APP_NAME,
}

module.exports = require("bunyan").createLogger(options);