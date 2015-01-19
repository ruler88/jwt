var request = require('request');
var config = require('./config.js');
var User = require('../models/User.js');
var createSendToken = require('./jwtCoding.js');

module.exports = function(req, res) {
	console.log(req.body.code);

	var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	var url = 'https://accounts.google.com/o/oauth2/token';
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		redirect_uri: req.body.redirectUri,
		grant_type: 'authorization_code',
		client_secret: config.GOOGLE_SECRET
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
};