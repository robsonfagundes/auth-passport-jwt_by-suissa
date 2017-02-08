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
	app.route('/user/register')
		.post(ctrlAuth.register);

	// login
	app.route('/user/login')
		.post(ctrlAuth.login);

	// user status
	app.route('/user/status')
		.post(ctrlAuth.verifyAuthentication);

	// logout
	app.route('/user/logout')
		.post(ctrlAuth.verifyAuthentication, ctrlAuth.logout);

	// getUser
	app.route('/user/getuser')
		.get(ctrlAuth.verifyAuthentication, ctrlAuth.getUser);

};