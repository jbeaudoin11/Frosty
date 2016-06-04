var Passport = require(__Config.LIBRARIE_PASSPORT_PATH);

module.exports = [
	//Examples
	// {"url" : "/examples", "callback" : __Ressources.example.getExamples},
	// {"url" : "/addExample/:name", "callback" : __Ressources.example.addExample},
	
	//Auth
	{"url" : "/auth/facebook", "callbacks" : [Passport.buildAuthLoginMiddleware("facebook")]},
	{"url" : "/auth/facebook/callback", "callbacks" : [Passport.buildAuthCallbackMiddleware("facebook")]},
	
	{"url" : "/auth/twitter", "callbacks" : [Passport.buildAuthLoginMiddleware("twitter")]},
	{"url" : "/auth/twitter/callback", "callbacks" : [Passport.buildAuthCallbackMiddleware("twitter")]},
	
	{"url" : "/auth/success", "callbacks" : [__Ressources.passport.loggedIn]},
	{"url" : "/auth/failed", "callbacks" : [__Ressources.passport.loginFailed]},
	{"url" : "/auth/logout", "callbacks" : [__Ressources.passport.logout]},
	
	//Paypal
	{"url" : "/paypal/payment/paypal", "callbacks" : [__Ressources.paypal.paymentWithPaypalAccount]},
	{"url" : "/paypal/payment/creditCard", "callbacks" : [__Ressources.paypal.paymentWithCreditCard]},
	{"url" : "/paypal/return", "callbacks" : [__Ressources.paypal.return]},
	{"url" : "/paypal/cancel", "callbacks" : [__Ressources.paypal.cancel]},
	
	//Test
	{"url" : "/test", "callbacks" : [__Ressources.test.test]},
]