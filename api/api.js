var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwtCoding = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

var strategyOptions = {
	usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
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

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
	var newUser = new User({
		email: email,
		password: password
	});

	newUser.save(function(err) {
		console.log(newUser);
		return done(null, newUser);
	});
});

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

app.post('/register', passport.authenticate('local-register'),
	function(req, res) {
		createSendToken(req.user, req, res);
	});

app.post('/login', passport.authenticate('local-login'),
	function(req, res) {
		createSendToken(req.user, req, res);
	});

function createSendToken(newUser, req, res) {
	var payload = {
		iss: req.hostname,		//issuer
		sub: newUser.id					//subject - userId
	};

	var token = jwtCoding.encode(payload, 'bigSecret');

	res.status(200).send({
		user: newUser.toJSON(),
		token: token
	});
}

var jobs = [
	'YOLO',
	'A JOB',
	'Lots of kittens'
];

app.get('/jobs', function(req, res) {
	if(!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized'
		});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwtCoding.decode(token, 'bigSecret');

	if(!payload.sub) {
		res.status(401).send({message: 'Authentication failed'});
	}

	res.json(jobs);
});

mongoose.connect('mongodb://localhost/psjwt', function(err) {
	if(err) {
		console.log('connection error', err);
	} else {
		console.log('connection to mongo successful');
	}
});

var server = app.listen(3030, function() {
	console.log('server listening on ', server.address().port);
});