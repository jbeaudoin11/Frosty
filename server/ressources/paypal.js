"use strict";

var paypal = require("paypal-rest-sdk");
var paypalConfig = require(__Config.PAYPAL_CONFIG_PATH);
var transactionsData = require(__Config.PAYPAL_TRANSACTIONS_PATH);

//configure paypal for login
paypal.configure(paypalConfig.paypalAuth);

//execute a payment via paypal account
exports.paymentWithPaypalAccount = (req, res) => {
	// var transactionsIds = req.query.transactionsIds;
	
	//TEST
	var transactionsIds = ["387c9ba399294a3ebc339123f4549930"];
	
	
	
	console.log(JSON.stringify(this.buildPaypalPayment(transactionsIds), null, 4))
	var paymentInfo = this.buildPaypalPayment(transactionsIds);
	if(paymentInfo.err) {
		res.json(paymentInfo.err);
	} else {
		paypal.payment.create(paymentInfo, (err, payment) => {
			if(err) {
				console.log(err)
				res.json({"err" : true, "msg" : "Payment error", "data" : err});
			} else {
				if(payment.state == "created") {
					var url;
					var valid = payment.links.some((link) => {
						if(link.method == "REDIRECT") {
							url = link.href;
							return true;
						}
					})
					
					if(valid) {
						req.session.paymentId = payment.id;
						res.redirect(url);	
					} else {
						res.json({"err" : true, "msg" : "There was an error"});
					}
				} else {
					res.json({"err" : true, "msg" : "There was an error for transaction creation"});
				}
			}
		})
	}
}

//exceute a payment via credit card
exports.paymentWithCreditCard = (req, res) => {
	// var transactionsIds = req.query.transactionsIds;
	// var creditCard = req.query.creditCard;
	//example of creditCard
	// "number": "5500005555555559",
	// "type": "mastercard",
	// "expire_month": 12,
	// "expire_year": 2018,
	// "cvv2": 111,
	// "first_name": "Joe",
	// "last_name": "Shopper"

	//TEST
	var transactionsIds = ["387c9ba399294a3ebc339123f4549930"];
	var creditCard = {
		"number": "5500005555555559",
		"type": "mastercard",
		"expire_month": 12,
		"expire_year": 2018,
		"cvv2": 111,
		"first_name": "Joe",
		"last_name": "Shopper"
	};
	
	var paymentInfo = this.buildCreditCardPayment(creditCard, transactionsIds);
	if(paymentInfo.err) {
		res.json(paymentInfo.err);
	} else {
		paypal.payment.create(paymentInfo, (err, payment) => {

			if(err) {
				console.log(err)
				res.json({"err" : true, "msg" : "Payment error", "data" : err});
				
				//TODO Update the user's informations
			} else {
				if(payment.state == "approved") {
					res.json({"sucess" : true});
				} else {
					res.json({"err" : true, "msg" : "There was an error for transaction aproval"});
				}
			}
		})
	}
}

this.buildPaypalPayment = (transactionsIds) => {
	var template = paypalConfig.getById("7f725868faf34774bad7c8c5fd7e56c2");

	if(template) {
		var transactions = transactionsData.getByIds(transactionsIds);
		if(transactions.indexOf(null) < 0) {
			template.transactions = transactions;

			return template;
		} else {
			return {"err" : true, "m" : `One or more transactions don't exist`, "data" : {transactionsIds, transactions}};
		}
	} else {
		//to be safe
		return {"err" : true, "m" : `No template [${"7f725868faf34774bad7c8c5fd7e56c2"}]`};
	}
}

this.buildCreditCardPayment = (creditCard, transactionsIds) => {
	var template = paypalConfig.getById("94ceb8d00ddf423a94090dc87f4e1083");

	if(template) {
		var transactions = transactionsData.getByIds(transactionsIds);
		if(transactions.indexOf(null) < 0) {
			template.payer.funding_instruments[0].credit_card = creditCard;
			template.transactions = transactions;

			return template;
		} else {
			return {"err" : true, "m" : `One or more transactions don't exist`, "data" : {transactionsIds, transactions}};
		}
	} else {
		//to be safe
		return {"err" : true, "m" : `No template [${"94ceb8d00ddf423a94090dc87f4e1083"}]`};
	}
}

//callback from paypal
exports.return = (req, res) => {
	var paymentId = req.session.paymentId;
	var details = {"payer_id" : req.query.PayerID};
	
	paypal.payment.execute(paymentId, details, (err, payment) => {
		if(err) {
			res.json({"err" : true, "m" : `An error occured in the payment execution`, "data" : err});
		} else {
			if(payment.state == "approved") {
				console.log(JSON.stringify(payment, null, 4))
				res.json({payment});
			} else {
				res.json({"err" : true, "m" : `The payment is not approved`});
			}
		}
	})
	
}

//callback if canceled
exports.cancel = (req, res) => {

	res.json({"cancel" : true});
}

