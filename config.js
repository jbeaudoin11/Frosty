
//INFO
exports.PORT = 4000;
exports.PUBLIC_IP_ADDRESS = "52.38.255.2";
exports.IP_ADDRESS = "172.31.40.1";
exports.HTTP_ADDRESS = "http://" + this.PUBLIC_IP_ADDRESS + ":" + this.PORT;

//MONGO
exports.MONGO_ADDRESS = `mongodb://localhost:27017/trava`;

//CLIENT
exports.CLIENT_PATH = __dirname + "/client";
exports.CLIENT_PUBLIC_PATH = this.CLIENT_PATH + "/public";
exports.CLIENT_APP_PATH = this.CLIENT_PATH + "/app";

//SERVER
exports.SERVER_PATH = __dirname + "/server";
exports.SERVER_METADATA_PATH = this.SERVER_PATH + "/metadata";

exports.SERVER_ROUTES_PATH = this.SERVER_PATH + "/routes";
exports.SERVER_ROUTES_LOADER_PATH = this.SERVER_ROUTES_PATH + "/_loader.js";

exports.SERVER_RESSOURCES_PATH = this.SERVER_PATH + "/ressources";
exports.SERVER_RESSOURCES_LOADER_PATH = this.SERVER_RESSOURCES_PATH + "/_loader.js";

exports.SERVER_LIBRARIES_PATH = this.SERVER_PATH + "/libraries";

exports.SERVER_MIDDLEWARES_PATH = this.SERVER_PATH + "/middlewares";
exports.SERVER_MIDDLEWARES_LOADER_PATH = this.SERVER_MIDDLEWARES_PATH + "/_loader.js";

exports.SERVER_SCHEMAS_PATH = this.SERVER_PATH + "/schemas";
exports.SERVER_SCHEMAS_LOADER_PATH = this.SERVER_SCHEMAS_PATH + "/_loader.js";

//RESSOURCES
exports.RESSOURCES_EXCLUDE_FILES = [
	// "test.js",
	"example.js",
];

//SCHEMAS
exports.SCHEMAS_EXCLUDE_FILES = [
	"example.js",
];

//LIBRARIES
exports.SERVER_SCRIPT_LOADER_PATH = `${this.SERVER_LIBRARIES_PATH}/ScriptLoader.js`;

//WEBPACK DEV
exports.WEBPACK_CONFIG_PATH = __dirname + "/webpack.config.js";
exports.WEBPACK_OUTPUT_PUBLIC_PATH = this.HTTP_ADDRESS + "/scripts/";