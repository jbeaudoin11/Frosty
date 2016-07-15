"use strict";

var mongoose = require("mongoose");
var Example = mongoose.model("Example");

exports.test = (req, res) => {
	res.json({"test" : Date.now()});
}

exports.start = (req, res) => {

	var ex = new Example();
	var i = req.params.id;

	id = setInterval(() => {
		Example
			.find({})
			.exec((err, data) => {
				// console.log(err);
				// console.log(data);
				// console.log(i);
			});

	}, 10);

	res.json({
		"start" : true,
	})
};

exports.stop = (req, res) => {
	
	if(id){
		clearInterval(id);
	}

	res.json({"stop" : true})
}