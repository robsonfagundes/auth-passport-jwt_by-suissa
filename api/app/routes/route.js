/**
 * route.js - Api's Routes
 *
 * @autor: Robson Fagundes
 * https://robsonfagundes.github.io/
 *
 */

'use strict';

// module
module.exports = function(app) {

	// controllers
	var ctrlAuth = app.controllers.auth;

	// home
	app.route('/')
		.get(ctrlAuth.verifyAuthentication, ctrlAuth.helloApi);

	// register
	app.route('/register')
		.post(ctrlAuth.register);

	// login
	app.route('/login')
		.post(ctrlAuth.login);

	// getUser
	app.route('/getuser')
		.get(ctrlAuth.verifyAuthentication, ctrlAuth.getUser);


};