var crypto = require('crypto');

//payload is a request attribute JSON
//secret is like SALT
exports.encode = function(payload, secret) {
	var algorithm = 'HS256';

	var header = {
		typ: 'JWT',
		alg: algorithm
	};

	//jwt look like 'header-encoded.payload-encoded.secret-signed'
	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
	jwt += '.' + sign(jwt, secret);

	return jwt;
};

exports.decode = function(token, secret) {
	var segments = token.split('.');
	if(segments.length !== 3) {
		throw new Error("Token structure does not have 3 parts");
	}

	var header = JSON.parse(base64Decode(segments[0]));
	var payload = JSON.parse(base64Decode(segments[1]));

	return payload;
};

function sign(str, secret) {
	return crypto.createHmac('sha256', secret).update(str).digest('base64');
}


function base64Encode(str) {
	return new Buffer(str).toString('base64');
}

function base64Decode(str) {
	return new Buffer(str, 'base64').toString();
}