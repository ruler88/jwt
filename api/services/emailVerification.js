var config = require('./config.js');
var jwtCoding = require('jwt-simple');
var _ = require('underscore');
var fs = require('fs');
var nodemailer = require('nodemailer');
var User = require('../models/User.js');

exports.send = function(email) {
	var payload = {
		sub: email
	};

	var token = jwtCoding.encode(payload, config.EMAIL_SECRET);

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'helloworld0424@gmail.com',
			pass: config.GMAIL_PASS
		}
	});

	var mailOptions = {
		from: 'Hello World',
		to: email,
		subject: 'psJWT account verification',
		html: getHtml(token)
	};

	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log('email send failed: ' + err);
		} else {
			console.log('email send success: ' + info);
		}
	});
};

exports.handler = function(req, res) {
	var token = req.query.token;

	var payload = jwtCoding.decode(token, config.EMAIL_SECRET);
	var email = payload.sub;
	if(!email) return handleError(res);

	User.findOne({email: email}, function(err, foundUser) {
		if(err) return res.status(500);

		if(!foundUser) return handleError(res);

		if(!foundUser.active) {
			foundUser.active = true;
		}

		foundUser.save(function(err) {
			if(err) return res.status(500);

			return res.redirect(config.APP_URL);
		});
	});
};

function handleError(res) {
	return res.status(401).send({
		message: 'Authentication failed, cannot verify email'
	});
}


_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var template = _.template("Hello {{ name }}!");
template({name: "Mustache"});

var model = {
	verifyUrl: 'http://localhost:3030/auth/verifyEmail?token=',
	title: 'psJwt',
	subTitle: 'Thanks for signing up',
	body: 'Please verify your email'
};

function getHtml(token) {
	var path = './views/emailVerification.html';
	var html = fs.readFileSync(path, 'utf8');

	var template = _.template(html);
	model.verifyUrl += token;

	return template(model);
}