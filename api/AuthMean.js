'use strict';

const express = require('express');
const app = express();
const router = express.Router();

// router module 
router.use((req, res, next) => {
	res.send('You Rocks!')
});

// module to url /hello 
app.use('/hello', router);

app.listen(3000, () => {
	console.log('AuthMean Api: Server running on localhost:3000')
}) 