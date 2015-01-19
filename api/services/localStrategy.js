var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');

var strategyOptions = {
	usernameField: 'email'
};

exports.loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
	User.findOne({email: email}, function(err, user) {
		if(err) return done(err);

		if(!user) {
			return done(null, false, {message: "Wrong login"});
		}

		user.comparePasswords(password, function(err, isMatch) {
			if(err) return done(err);
			if(!isMatch) {
				return done(null, false, {message: "Wrong login"});
			}

			return done(null, user);
		});
	});
});

exports.registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {

	User.findOne({email: email}, function(err, user) {
		if(err) return done(err);

		if(user) {
			return done(null, false, { message: "Email already exists"});
		}

		var newUser = new User({
			email: email,
			password: password
		});

		newUser.save(function(err) {
			console.log(newUser);
			return done(null, newUser);
		});
	});
});
