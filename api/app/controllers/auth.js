/**
 * auth.js - Authentication Controller
 *
 * @autor: Robson Fagundes
 * robsonfagundes@gmail.com
 *
 */

'use strict';

//express-load
module.exports = function(app) {


	var path = require('path');
	var qs = require('querystring');

	var async = require('async');
	var bcrypt = require('bcryptjs');
	var bodyParser = require('body-parser');
	var cors = require('cors');
	var express = require('express');
	var logger = require('morgan');
	var jwt = require('jwt-simple');
	var moment = require('moment');
	var mongoose = require('mongoose');
	var request = require('request');

	var config = require('./oauthcfg');

	var user = app.models.user;
	var controller = {};


	// Hello api
	controller.helloApi = function(req, res) {
		res.status(200).json('Welcome to API Auth');
	};

	// Check user authentication
	controller.verifyAuthentication = function(req, res, next) {
		if (!req.header('Authorization')) {
			return res.status(401).json('API Auth - User is not authorized!');
		}
		var token = req.header('Authorization').split(' ')[1];

		var payload = null;
		try {
			payload = jwt.decode(token, config.TOKEN_SECRET);
		} catch (err) {
			return res.status(401).send({
				message: err.message
			});
		}

		if (payload.exp <= moment().unix()) {
			return res.status(401).send({
				message: 'Token has expired'
			});
		}
		req.user = payload.sub;
		next();
	}

	// Generate JSON Web Token
	controller.createJWT = function(user) {
		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14, 'days').unix()
		};
		return jwt.encode(payload, config.TOKEN_SECRET);
	}

	// return controller
	return controller;
};