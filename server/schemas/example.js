"use strict";
//Very simple example schema

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var exampleScheam = new Schema({
	"name" : {"type" : String}
}, {
	"strict" : true,
})

module.exports = () => {
	__Schemas.example = exampleSchema;
	
	mongoose.model("Example", exampleScheam)
}