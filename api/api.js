var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.user(bodyParser.json());

app.post('/register', function(req, res) {
	console.log(req.body);
	res.send("test");
});

var server = app.listen(3000, function() {
	console.log('server listening on ', server.address().port);
});