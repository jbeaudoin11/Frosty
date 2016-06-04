"use strict";
//example of ressources usage with Mongoose

var mongoose = require("mongoose");
var Example = mongoose.model("Example");

exports.getExamples = (req, res) => {
	Example.find({})
	.exec((err, docs) => {
		res.json(docs)
	});
}

exports.addExample = (req, res) => {
	var example = new Example({
		"name" : req.params.name,
	})
	example.save((err) => {
		if(err) {
			console.log("ERROR : " + err);
		
			res.json({
				"created" : false,
				err,
			})
		} else {
			res.json({
				"created" : true,
				"data" : e
			})
		}
	});
}