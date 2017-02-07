/**
 * user.js - User Collection MongoDB
 *
 * @autor: robson fagundes
 * robsonfagundes@gmail.com
 */

'use strict';

var mongoose = require('mongoose');

module.exports = function() {

	var userSchema = mongoose.Schema({

		username: {
			type: String,
			require: true,
			index: {
				unique: true
			}
		},
		password: {
			type: String,
			select: false
		},
		displayName: {
			type: String
		},
		picture: {
			type: String
		},
		bitbucket: {
			type: String
		},
		facebook: {
			type: String
		},
		foursquare: {
			type: String
		},
		google: {
			type: String
		},
		github: {
			type: String
		},
		instagram: {
			type: String
		},
		linkedin: {
			type: String
		},
		live: {
			type: String
		},
		yahoo: {
			type: String
		},
		twitter: {
			type: String
		},
		twitch: {
			type: String
		},
		spotify: {
			type: String
		},
		date_created: {
			type: Date,
			default: Date.now
		}

	});


	userSchema.pre('save', function(next) {
		var user = this;
		if (!user.isModified('password')) {
			return next();
		}
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash;
				next();
			});
		});
	});

	userSchema.methods.comparePassword = function(password, done) {
		bcrypt.compare(password, this.password, function(err, isMatch) {
			done(err, isMatch);
		});
	};


	return mongoose.model('User', userSchema);
};