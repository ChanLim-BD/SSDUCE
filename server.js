var express = require('express');
var http = require('http');
var https = require('https');

var config = require('./config/config');

var app = express();
app.set('port', 3000);


console.log('===== Router Setting =====');
var routes_loader = require('./routes/routes_loader');
var router = express.Router();
routes_loader.init(app, router);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('===== Create Server =====');
    console.log('Server : Express WebServer Start driving --> PORT : ' + app.get('port'));
});
