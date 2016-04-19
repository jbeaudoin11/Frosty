"use strict";
//store paypal information for paiment

var KeyMapping = require(__Config.LIBRARIE_KEY_MAPPING_PATH);

//authentification to paypal
//need a better (secure) way to store thoses infos
exports.paypalAuth = {
	"mode" : __Config.PAYPAL_MODE || "sandbox",
	"client_id" : "AR6jff5uE4YsG5p8QwGkrOJ7K8DhL6SRRFAAwaXnY3mGU_EhIb-Ug59teWJ83LY4zEV8agv2HU2NnUjS",
	"client_secret" : "EIH-QZyL3Otcic5GEp1f91fW97RKkBe5PB4oFBNI-1XZNM-YQyQgBVtWLUkhGrsSWcmGRM20THkFboRd",
}

var templates = {
	//template for sale with paypal
	"7f725868faf34774bad7c8c5fd7e56c2" : {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal",
		},
		"transactions": [
			// {
			// 	"amount": {
			// 		"total": "5.00",
			// 		"currency": "USD"
			// 	},
			// 	"description": "My awesome payment",
			// },
		],
		"redirect_urls": {
			"return_url": __Config.PAYPAL_RETURN_URL,
			"cancel_url": __Config.PAYPAL_CANCEL_URL,
		},
	},
	
	//template for sale with credit card
	"94ceb8d00ddf423a94090dc87f4e1083" : {
		"intent": "sale",
		"payer": {
			"payment_method": "credit_card",
			"funding_instruments": [{
				"credit_card": {
					// "number": "5500005555555559",
					// "type": "mastercard",
					// "expire_month": 12,
					// "expire_year": 2018,
					// "cvv2": 111,
					// "first_name": "Joe",
					// "last_name": "Shopper"
				},
			}],
		},
		"transactions": [
			// {
			// 	"amount": {
			// 		"total": "5.00",
			// 		"currency": "USD"
			// 	},
			// 	"description": "My awesome payment"
			// },
		]
	},
}

exports.getById = KeyMapping.buildGetById(templates);