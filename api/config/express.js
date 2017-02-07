/**
 * express.js - Express Config
 *
 * @autor: Robson Fagundes
 * 		   robsonfagundes@gmail.com
 *
 */

'use strict';

var express = require('express'); // for express
var load = require('express-load'); // for load routes
var bodyParser = require('body-parser'); // for middleware
var http = require('http');

module.exports = function(){

	var app = express();
	
	// Create server listen
	http.createServer(app).listen(3000); // Create an HTTP service.

	// middlewares	
	app.use(express.static('./public'));

	/**
	* load routes (express-load)
	*/ 
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	/**
	 * when no route meet
	 */	
	app.get('*', function(req, res) {
		res.status(404);
	});		

	/**
	 * return app
	 */
	return app;

}