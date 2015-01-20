var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var createSendToken = require('./services/jwtCoding.js');
var localStrategy = require('./services/localStrategy.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');

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

passport.use('local-login', localStrategy.loginStrategy);
passport.use('local-register', localStrategy.registerStrategy);

app.post('/register', passport.authenticate('local-register'),
	function(req, res) {
		emailVerification.send(req.user.email);
		createSendToken(req.user, req, res);
	});

app.post('/login', passport.authenticate('local-login'),
	function(req, res) {
		createSendToken(req.user, req, res);
	});

app.post('/auth/facebook', facebookAuth);

app.get('/jobs', jobs);

app.post('/auth/google', googleAuth);

app.get('/auth/verifyEmail', emailVerification.handler);

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