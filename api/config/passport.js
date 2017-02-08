'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

	// user obj	
	var User = mongoose.model('User');

	// Define the strategy Local to be used by PassportJS
	passport.use(new LocalStrategy(

		function(username, password, done) {

			User.findOne({
				username: username

			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'User not found.'
					});
				}
				if (!username) {
					return done(null, false, {
						message: 'Incorrect username.'
					});
				}
				if (!validPassword(password, user.password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
				return done(null, user);
			});
		}
	));

	// serialize the objectID
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	// deserialize the objectID
	passport.deserializeUser(function(id, done) {
		User.findById(id).exec()
			.then(function(user) {
				done(null, user._id);
			})
	});

	// test a matching password
	function validPassword(pwsFrontend, pwsBackend) {
		return bcrypt.compareSync(pwsFrontend, pwsBackend);
	};

}