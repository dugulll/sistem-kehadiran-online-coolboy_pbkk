var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'sisked'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var nrp = request.body.nrp;
	var password = request.body.password;
	if (nrp && password) {
		connection.query('SELECT * FROM siswa WHERE nrp = ? AND password = ?', [nrp, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.nrp = nrp;
				response.redirect('/home');
			} else {
				response.send('NRP/Password Salah');
			}			
			response.end();
		});
	} else {
		response.send('Masukan NRP dan Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Selamat Datang, ' + request.session.nrp + '!');
	} else {
		response.send('Silahkan Login Dulu!');
	}
	response.end();
});
console.log('jalan')
app.listen(3000);