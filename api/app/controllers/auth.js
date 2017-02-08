/**
 * auth.js - Authentication Controller
 *
 * @autor: Robson Fagundes
 * https://robsonfagundes.github.io/
 *
 */

'use strict';

//express-load
module.exports = function(app) {

	var path = require('path');
	var qs = require('querystring');

	var async = require('async');
	var bodyParser = require('body-parser');
	var config = require('./oauthcfg');
	var cors = require('cors');
	var express = require('express');
	var logger = require('morgan');
	var jwt = require('jwt-simple');
	var moment = require('moment');
	var mongoose = require('mongoose');
	var request = require('request');
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;

	// model & ctrl
	var user = app.models.user;
	var controller = {};


	// Hello api
	controller.helloApi = function(req, res) {
		res.status(200).json('Welcome to API Auth');
	};


	// login
	controller.login = function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({
					err: info
				});
			}
			req.logIn(user, function(err) {
				if (err) {
					return res.status(500).json({
						err: 'Could not log in user'
					});
				}
				res.status(200).json({
					status: 'Login successful!'
				});
			});
		})(req, res, next);
	};

	// add new user
	controller.register = function(req, res) {
		User.register(new User({
				username: req.body.username
			}),
			req.body.password,
			function(err, account) {
				if (err) {
					return res.status(500).json({
						err: err
					});
				}
				passport.authenticate('local')(req, res, function() {
					return res.status(200).json({
						status: 'Registration successful!'
					});
				});
			});
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
				message: 'Token has expired!'
			});
		}
		req.user = payload.sub;
		next();
	};

	// Generate JSON Web Token
	controller.createJWT = function(user) {
		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14, 'days').unix()
		};
		return jwt.encode(payload, config.TOKEN_SECRET);
	};

	// get user
	controller.getUser = function(req, res) {
		User.findById(req.user).exec()
			.then(
				function(user) {
					if (!user) throw new Error('API Auth: User not found!');
					res.json(user);
				},
				function(error) {
					res.status(404).json(error);
				}
			);
	};


	// return controller
	return controller;
};