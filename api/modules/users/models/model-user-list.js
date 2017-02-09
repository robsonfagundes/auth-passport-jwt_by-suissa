'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _schema = {
	name: String
}
const userSchema = new Schema(_schema);
const UserModel = mongoose.model('User', userSchema);

module.exports = (req, res) => {
	UserModel.find({}, function(err, data) {
		if (err) return console.log(err);
		res.send(data);
	});
}