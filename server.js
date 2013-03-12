var request = require("request");
var express = require('express');
var checker = require('./lib/checker');

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.get('/github/:username', function(req, res) {
	checker.checkGithub(req.params.username, function(status) {
		res.send(status);
	});
});

app.get('/twitter/:username', function(req, res) {
	checker.checkTwitter(req.params.username, function(status) {
		res.send(status);
	});
});

app.get('/io/:username', function(req, res) {
	request('http://www.'+req.params.username+'.io/', function (error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send('taken');
		} else {
			res.send('free');
		}
	});
});

app.get('/com/:username', function(req, res) {
	request('http://www.'+req.params.username+'.com/', function (error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send('taken');
		} else {
			res.send('free');
		}
	});
});

app.listen(process.env.PORT || 8080);
