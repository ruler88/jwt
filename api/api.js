var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

	var newUser = new User({
		email: user.email,
		password: user.password
	});

	newUser.save(function(err) {
		res.status(200).json(newUser);
	});
});


var User = mongoose.model('User', {
	email: String,
	password: String
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