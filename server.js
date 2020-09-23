// ===== Express ===== //
var express = require('express');
var app = express();

var http = require('http');
var https = require('https');

var config = require('./config/config');
app.set('port', config.server_port || 3000);

// ===== View Engine ===== //
var ejs = require('ejs');
app.set('views',  __dirname + '/views');

// ===== Client Approach Limit ===== //
var static = require('serve-static');
var path = require('path');
app.use('/public', static(path.join(__dirname, 'public')));

// ===== Page Error Handler ===== //
var expressErrorHandler = require('express-error-handler');
// app.use(expressErrorHandler.httpError(404));

// ===== Body Parser ===== //
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

// ===== Cookie Parser ===== //
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// ===== Session ===== //
var expressSession = require('express-session');
app.use(expressSession(config.session_param));

// ===== Cors ===== //
var cors = require('cors');
app.use(cors());

// ===== Passport ===== //
var passport = require('passport');
var kakaoStrategy = require('passport-kakao').Strategy;
app.use(passport.initialize());
app.use(passport.session());

// ===== Database ===== //
var database_loader = require('./database/database_loader');

console.log('Info : Version -> ' + process.version);

console.log('===== Router Setting =====');
var routes_loader = require('./routes/routes_loader');
var router = express.Router();
routes_loader.init(app, router);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('===== Create Server =====');
    console.log('Server : Express WebServer Start driving --> PORT : ' + app.get('port'));
    console.log('===== Database Connection =====');
    database_loader.init(app, config);
});
