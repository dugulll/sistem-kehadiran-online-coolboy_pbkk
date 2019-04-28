var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var path = require("path");

var server = http.createServer(function (req, res) {
require('fs').createReadStream(require('path').join(__dirname, req.url)).on('error',function(){ // static files!
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(
      require('fs')
        .readFileSync(require('path')
        .join(__dirname, 'test.html') // or default to index
      ));
    }).pipe(res); // stream
  });

server.listen(5000);
console.log('Server running on 5000...');