
'use strict'

const mongoose = require("mongoose");
const dbURI = 'mongodb://localhost/mean-auth';

// connect
mongoose.connect(dbURI);

// manager connection
mongoose.connection.on('connected', function() {
	console.log('Auth Mean API - Mongoose connected on: ' + dbURI);
});
mongoose.connection.on('disconnected', function() {
	console.log('Auth Mean API - Mongoose disconnected at: ' + dbURI);
});
mongoose.connection.on('error', function(err) {
	console.log('Auth Mean API - Mongoose connection error: ' + err);
});
mongoose.connection.on('open', function() {
	console.log('Auth Mean API - Mongoose default connection is open');
});

// close connection
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Auth Mean API - Mongoose: Disconected by the end of application!')
		process.exit(0);
	});
});
