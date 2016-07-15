"use strict";
//Very simple example schema

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var exampleSchema = new Schema({
	"name" : {"type" : String}
}, {
	"strict" : true,
})

/*
	//Complete the Schema if needed like helper methods, etc...
	exampleSchema.methods.findTest = function(callback) {
		return this.model
			.find({"name" : "Test"})
			.exec(callback);
	}

	//Call it with the model
	var Example = mongoose.model("Example", exampleSchema);
	Example.findTest(function(data) {
		...
	});
*/

//Must export a function to load the Schema
module.exports = () => {
	//Use to register the model of the Schema

	//Add the Schema to __Schemas
	__Schemas.example = exampleSchema;
	
	//Register the Schema as a model
	var Example = mongoose.model("Example", exampleSchema);

}