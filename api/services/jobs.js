var jwtCoding = require('jwt-simple');

module.exports = function(req, res) {
	var jobs = [
		'YOLO',
		'A JOB',
		'Lots of kittens'
	];

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
};