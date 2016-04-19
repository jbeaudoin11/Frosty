"use strict";
//store all transaction items

//example
// {
// 	"amount": {
// 		"total": "5.00",
// 		"currency": "CAD"
// 	},
// 	"description": "My awesome payment",
// },

var KeyMapping = require(__Config.LIBRARIE_KEY_MAPPING_PATH);

var transactions = {
	"387c9ba399294a3ebc339123f4549930" : {
		"amount": {
			"total": "5.00",
			"currency": "CAD"
		},
		"description": "My test payment",
	}
}

exports.getByIds = KeyMapping.buildGetByIds(transactions);
exports.getById = KeyMapping.buildGetById(transactions);