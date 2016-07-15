//define some const to be used in different section of the server

//INFO
exports.PORT = 4000;
exports.PUBLIC_IP_ADDRESS = "52.38.255.2";
exports.IP_ADDRESS = "172.31.40.1";
// exports.HTTP_ADDRESS = "http://" + this.PUBLIC_IP_ADDRESS + ":" + this.PORT;
exports.HTTP_ADDRESS = "http://trava.ca:" + this.PORT;

//MONGO
exports.MONGOOSE_ADDRESS = `mongodb://localhost:27017/trava`;
exports.MONGOOSE_OPTIONS = {
	"server" : {
		"poolSize" : 10,
	}
};

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
	// "user.js",
	// "example.js",
];

//MIDDLEWARES
//list of MW to load in the middlewares folder (order is important)
exports.MIDDLEWARES = [
	"helmet.js",
	"expressStatic.js",
	"parser.js",
	"webpack.js",
	"expressSession.js",
	"passport.js",
	"routing.js",
];

//LIBRARIES
exports.LIBRARIE_SCRIPT_LOADER_PATH = `${this.SERVER_LIBRARIES_PATH}/ScriptLoader.js`;
exports.LIBRARIE_PASSPORT_PATH = `${this.SERVER_LIBRARIES_PATH}/Passport.js`;
exports.LIBRARIE_KEY_MAPPING_PATH = `${this.SERVER_LIBRARIES_PATH}/KeyMapping.js`;

//WEBPACK DEV
exports.WEBPACK_CONFIG_PATH = __dirname + "/webpack.config.js";
exports.WEBPACK_OUTPUT_PUBLIC_PATH = this.HTTP_ADDRESS + "/scripts/";

//EXPRESS
exports.SESSION_SECRET = "eb7ad9d0dc634b2abc73c821fc6448ac";
exports.EXPRESS_SESSION_CONFIG = {
	"secret" : this.SESSION_SECRET,
	"cookie" : {
		"secure" : false,//bug if true, the session change every req
		"maxAge" : 1000 * 60 * 60 * 24 * 7 //1 week
	},
	"resave" : true,
	"saveUninitialized" : true,
};

//PASSPORT
exports.PASSPORT_CONFIG_PATH = `${this.SERVER_METADATA_PATH}/passport.js`;

//PAYPAL
exports.PAYPAL_CONFIG_PATH = `${this.SERVER_METADATA_PATH}/paypal.js`;
exports.PAYPAL_TRANSACTIONS_PATH = `${this.SERVER_METADATA_PATH}/transactions.js`;
exports.PAYPAL_MODE = "sandbox";//sandbox or live
exports.PAYPAL_RETURN_URL = `${this.HTTP_ADDRESS}/paypal/return`;
exports.PAYPAL_CANCEL_URL = `${this.HTTP_ADDRESS}/paypal/cancel`;