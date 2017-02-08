/**
 * express.js - Express Config
 *
 * @autor: Robson Fagundes
 * robsonfagundes@gmail.com
 *
 */

'use strict';

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

module.exports = function() {

	var app = express();

	// Create server listen
	http.createServer(app).listen(3000); // Create an HTTP service.

	// middlewares	
	app.use(express.static('./public'));
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	/**
	 * load routes (express-load)
	 */
	load('models', {
			cwd: 'app'
		})
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