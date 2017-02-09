'use strict';

// midlewares
const express = require('express');
const app = express();
const router = express.Router();

// router module 
router.all('*', (req, res, next) => {
	res.setHeader('AuthMeanAPI', 'https://github.com/robsonfagundes/mean-auth-passport-jwt');
	console.log('You Rocks!');
	next();
});

// get all users
router.get('/', (req, res) => {
	require('./models/model-user-list')(req, res);
});

module.exports = router;