"use strict";
//example of ressources usage with Mongoose

var mongoose = require("mongoose");

exports.getExamples = (req, res) => {
	__Models.Example.find({}, (err, docs) => {
		res.json(docs)
	})
}

exports.addExample = (req, res) => {
	var e = new __Models.Example({
		"name" : req.params.name,
	})
	e.save((err) => {
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
	})
}