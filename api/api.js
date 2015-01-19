var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwtCoding = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var facebookAuth = require('./services/facebookAuth.js');
var createSendToken = require('./services/jwtCoding.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Credentials', 'true');
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

app.post('/auth/facebook', facebookAuth);

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

app.post('/auth/google', function(req, res) {
	console.log(req.body.code);

	var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	var url = 'https://accounts.google.com/o/oauth2/token';
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		redirect_uri: req.body.redirectUri,
		grant_type: 'authorization_code',
		client_secret: '6O43F4fOc09WqxUzKp2HQgxO'
	};
	request.post(url, {
		json: true,
		form: params
	}, function(err, postResponse, token) {
		var accessToken = token.access_token;

		var headers = {
			Authorization: 'Bearer ' + accessToken
		};

		request.get({
			url: apiUrl,
			headers: headers,
			json: true
		}, function(err, googResponse, profile) {
			User.findOne({googleId: profile.sub}, function(err, foundUser) {
				if(foundUser) {
					return createSendToken(foundUser, req, res);
				} else {
					var newUser = new User();
					newUser.googleId = profile.sub;
					newUser.displayName = profile.name;
					newUser.save(function(err) {
						if(err) return next(err);
						createSendToken(newUser, req, res);
					});
				}
			});

			console.log(profile);
		});

	});
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