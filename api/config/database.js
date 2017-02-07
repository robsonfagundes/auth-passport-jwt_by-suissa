/**
 * database.js - Config Database Connection
 *
 * @autor: Robson Fagundes
 * 		   robsonfagundes@gmail.com
 *
 */

'use strict'

var mongoose = require("mongoose");

 
module.exports = function(uri) {

	// debbuger
	mongoose.set('debug', true);

	// use bluebird
	mongoose.Promise = require('bluebird');

	// pool X connction
	mongoose.connect(uri, {server: {poolSize: 1}});

	// manager connection
	mongoose.connection.on('connected', function() {
		console.log('apiauth - Mongoose: Conected on: ' + uri);
	});
	mongoose.connection.on('disconnected', function() {
		console.log('apiauth - Mongoose: Disconected at: ' + uri);
	});
	mongoose.connection.on('error', function(error) {
		console.log('apiauth - Mongoose: Error connection: ' + error);
	});

	// close connection
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
			console.log('apiauth - Mongoose: Disconected by the end of application!')
			process.exit(0);
		});
	});
};