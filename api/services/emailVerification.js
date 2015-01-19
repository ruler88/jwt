var config = require('./config.js');
var jwtCoding = require('jwt-simple');
var _ = require('underscore');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.send = function(email) {
	var payload = {
		sub: email
	};

	var token = jwtCoding.encode(payload, config.EMAIL_SECRET);

	var transporter = nodemailer.createTransport(smtpTransport({

	}));
};

_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var template = _.template("Hello {{ name }}!");
template({name: "Mustache"});

var model = {
	verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
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