/**
 * apiauth.js - Start API on Node
 *
 * @autor: Robson Fagundes
 * robsonfagundes@gmail.com
 *
 */

'use strict'

var http = require('http');
var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost:27017/apiauth');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Api Auth: Node and Express server listen on port ' + app.get('port'));
});
