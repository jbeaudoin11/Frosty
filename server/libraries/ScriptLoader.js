"use strict";
//used to gatter the filename of each files in the folder

var fs = require("fs");
var path = require("path");

var Promise = require("promise");

module.exports = (dirname, excludeFiles, loader) => {
	excludeFiles = excludeFiles.map((filename) => path.basename(filename));

	//Filter the files list
	var files = fs.readdirSync(dirname).filter((filename) => {
		return excludeFiles.indexOf(filename) < 0;
	});

	//Generate loaders function
	var loaders = files.map((filename) => {
		return loader(filename);
	});

	return Promise.all(loaders);	
} 