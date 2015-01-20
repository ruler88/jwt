var bcrypt = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');

module.exports = {
	login: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if(!email || !password) {
			return res.status(401).send({
				message: "username or pw missing"
			});
		}

		User.findOneByEmail(email, function(err, foundUser) {
			if(!foundUser) {
				return res.status(401).send({
					message: "username or pw invalid"
				});
			}

			bcrypt.compare(password, foundUser.password, function(err, isValid) {
				if(err) return res.status(403);

				if(!isValid) {
					return res.status(401).send({
						message: "username or pw invalid"
					});
				}

				createSendToken(foundUser, req, res);
			});

		});
	},

	register: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if(!email || !password) {
			return res.status(401).send({
				message: "username or pw missing"
			});
		}

		User.create({
			email: email,
			password: password
		}).exec(function(err, user) {
			if(err) return res.status(403);
			createSendToken(user, req, res);
		});
	}
};

