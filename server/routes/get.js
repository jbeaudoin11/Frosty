var Passport = require(__Config.SERVER_LIBRARIE_PASSPORT_PATH);

module.exports = [
	//some route exemple
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
	
	// {"url" : "/test1", "callbacks" : [(req, res) => {
	// 	req.session.t = 1;
	// 	req.session.save();
		
	// 	console.log("1 : " + req.sessionID);
	// 	res.send()
	// }]},
	// {"url" : "/test2", "callbacks" : [(req, res) => {
	// 	console.log(req.session);
	// 	console.log("2 : " + req.sessionID);
		
	// 	res.send()
	// }]},
	{"url" : "/test", "callbacks" : [__Ressources.test.test]},
]