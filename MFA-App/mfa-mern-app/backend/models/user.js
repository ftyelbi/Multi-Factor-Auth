"""Create a user model"""
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	  name: String,
	  email: String,
	  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;


"""Update user model and schema"""
const mongoose = require('mongoose');
const { mfaSecret } = require('./mfa');

const userSchema = new mongoose.Schema({
	  name: String,
	  email: String,
	  password: String,
	  mfaSecret: String,
	  mfaEnabled: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;
