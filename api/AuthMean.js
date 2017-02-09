'use strict';

// database connect
require('./db/config')

// midlewares
const express = require('express');
const app = express();
const UserApi = require('./modules/users/routes.js')

// module to url /api/users
app.use('/api/users', UserApi);

// listen
app.listen(3000, () => {
	console.log('AuthMean Api: Server running on localhost:3000');
});

