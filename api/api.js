var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwtCoding = require('./services/jwtCoding.js');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

app.post('/register', function(req, res) {
	console.log(req.body);

	var user = req.body;

	var newUser = new User.model({
		email: user.email,
		password: user.password
	});

	var payload = {
		iss: req.hostname,		//issuer
		sub: newUser._id					//subject - userId
	};

	var token = jwtCoding.encode(payload, 'bigSecret');

	newUser.save(function(err) {
		console.log(newUser);
		res.status(200).send({
				user: newUser.toJSON(),
				token: token
			});
	});
});

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

var server = app.listen(3000, function() {
	console.log('server listening on ', server.address().port);
});