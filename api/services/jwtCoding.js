var crypto = require('crypto');

//payload is the user JSON
//secret is like SALT
exports.encode = function(payload, secret) {
	var algorithm = 'HS256';

	var header = {
		typ: 'JWT',
		alg: algorithm
	};

	//jwt look like 'header-encoded.payload-encoded.secret-signed'
	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(payload);
	jwt += '.' + sign(jwt, secret);

	return jwt;
};

function sign(str, secret) {
	return crypto.createHmac('sha256', secret).update(str).digest('base64');
}


function base64Encode(str) {
	return new Buffer(str).toString('base64');
}