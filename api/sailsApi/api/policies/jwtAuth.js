var jwtCoding = require('jwt-simple');

module.exports = function(req, res, next) {
	if(!req.headers || !req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized'
		});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwtCoding.decode(token, 'bigSecret');

	if(!payload.sub) {
		return res.status(401).send({message: 'Authentication failed'});
	}

	next();
};