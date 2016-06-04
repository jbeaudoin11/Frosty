"use strict";
//used to gatter the filename of each files in the folder

var fs = require("fs");
var path = require("path");

module.exports = (dirname, excludeFiles, callback) => {
	excludeFiles = excludeFiles.map((filename) => path.basename(filename));

	var files = fs.readdirSync(dirname).filter((filename) => {
		return excludeFiles.indexOf(filename) < 0;
	});
	
	files.forEach(callback)
} 