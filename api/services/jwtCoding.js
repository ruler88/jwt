var jwtCoding = require('jwt-simple');
var moment = require('moment');

module.exports = function(newUser, req, res) {
	var payload = {
		iss: req.hostname,		//issuer
		sub: newUser.id,				//subject - userId
		exp: moment().add(10, 'days').unix()		//expiration
	};

	var token = jwtCoding.encode(payload, 'bigSecret');

	res.status(200).send({
		user: newUser.toJSON(),
		token: token
	});
}