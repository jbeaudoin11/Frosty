//Routes for GET methods

var Passport = require(__Config.LIBRARIE_PASSPORT_PATH);

module.exports = [
	//Examples
	// {"url" : "/examples", "listeners" : __Ressources.example.getExamples},
	// {"url" : "/addExample/:name", "listeners" : __Ressources.example.addExample},
	
	//Auth
	{"url" : "/auth/facebook", "listeners" : [Passport.buildAuthLoginMiddleware("facebook")]},
	{"url" : "/auth/facebook/callback", "listeners" : [Passport.buildAuthCallbackMiddleware("facebook")]},
	
	{"url" : "/auth/twitter", "listeners" : [Passport.buildAuthLoginMiddleware("twitter")]},
	{"url" : "/auth/twitter/callback", "listeners" : [Passport.buildAuthCallbackMiddleware("twitter")]},
	
	{"url" : "/auth/success", "listeners" : [__Ressources.passport.loggedIn]},
	{"url" : "/auth/failed", "listeners" : [__Ressources.passport.loginFailed]},
	{"url" : "/auth/logout", "listeners" : [__Ressources.passport.logout]},
	
	//Paypal
	{"url" : "/paypal/payment/paypal", "listeners" : [__Ressources.paypal.paymentWithPaypalAccount]},
	{"url" : "/paypal/payment/creditCard", "listeners" : [__Ressources.paypal.paymentWithCreditCard]},
	{"url" : "/paypal/return", "listeners" : [__Ressources.paypal.return]},
	{"url" : "/paypal/cancel", "listeners" : [__Ressources.paypal.cancel]},
	
	//Test
	{"url" : "/test", "listeners" : [__Ressources.test.test]},
	{"url" : "/test2", "listeners" : [function(req, res) {
		res.send(Date.now())
	}]},
]