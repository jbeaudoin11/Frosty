"use strict";
//Very simple example schema

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = () => {
	__Models.Example = mongoose.model("example", new Schema({
		"name" : {"type" : String}
	}, {
		"strict" : true,
	}))
}