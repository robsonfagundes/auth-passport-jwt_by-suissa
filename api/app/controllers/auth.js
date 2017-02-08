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

	// midlewares
	var async = require('async');
	var bcrypt = require('bcrypt');
	var bodyParser = require('body-parser');
	var express = require('express');
	var jwt = require('jwt-simple');
	var moment = require('moment');
	var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;

	// Model & ctrl
	var user = app.models.user;
	var controller = {};

	// Oauthcfg
	var config = require('./oauthcfg');

	/**
	 * --------------------------------------------------------------------------
	 * Passport
	 * --------------------------------------------------------------------------
	 */

	// Initialize passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Authentication strategies
	passport.use(new LocalStrategy(
		function(username, password, done) {
			user.findOne({
			username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Incorrect username.'
					});
				}
				if (!validPassword(password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
				return done(null, user);
			});
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});


	/**
	 * --------------------------------------------------------------------------
	 * Login controller
	 * --------------------------------------------------------------------------
	 */

	// Hello api
	controller.helloApi = function(req, res) {
		res.status(200).json('Welcome to API Auth');
	};

	// Log in
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

	// log out
	controller.logout = function(req, res) {
		req.logOut();
		res.send(200).json({
			status: 'Welcome, Bye!'
		});

	};

	// Add new user
	controller.register = function(req, res) {
		user = new user({
			username: req.body.username,
			password: req.body.password
		});

		var User = app.models.user;
		User.create(user)
			.then(
				function(user) {
					res.status(200).json('API Auth: Registration successful!');
					passport.authenticate('local')(req, res, function() {
						return res.status(200).json({
							status: 'Registration successful!'
						});
					});
				},
				function(error) {
					res.status(500).json('API Auth: Registration error: ' + error);
					console.log(error)
				}
			);
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


	// route to info user status, test if the user is logged in or not
	controller.userstatus = function(req, res) {
		if (!req.isAuthenticated()) {
			return res.status(200).json({
				status: false
			});
		}
		res.status(200).json({
			status: true
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
	function createJWT(user) {
		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14, 'days').unix()
		};
		return jwt.encode(payload, config.TOKEN_SECRET);
	};


	// test a matching password
	function validPassword(pwsFrontend, pwsBackend) {
		return bcrypt.compare(pwsFrontend, pwsBackend);
	};


	// return controller
	return controller;
};