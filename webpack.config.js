var config = require("./config.js");
var webpack = require("webpack");

module.exports = {
	"target" : "web",
	"entry" : [
		"webpack/hot/dev-server",
		"webpack-hot-middleware/client",
		config.CLIENT_APP_PATH + "/index.js",
	],
	"output" : {
		"filename" : "bundle.js",
		"path" : "/",
		"publicPath" : config.WEBPACK_OUTPUT_PUBLIC_PATH,
	},
	"module" : {
		
	},
	"plugins" : [
		new webpack.HotModuleReplacementPlugin(),
	],
}