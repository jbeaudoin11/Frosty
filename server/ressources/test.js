"use strict";

exports.test = (req, res) => {
	res.json({
		"test" : Date.now(),
	})
};