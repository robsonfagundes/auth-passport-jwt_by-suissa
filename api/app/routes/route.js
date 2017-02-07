/**
 * route.js - Api's Routes
 *
 * @autor: Robson Fagundes
 * robsonfagundes@gmail.com
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

	// getUser
	app.route('/getuser')
		.get(ctrlAuth.verifyAuthentication, ctrlAuth.getUser);


};