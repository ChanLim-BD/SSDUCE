// ===== Express ===== //
var express = require('express');
app = express();    // global

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




// ===== Body Parser ===== //
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
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
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(member, done) {
    done(null, member);
});

passport.deserializeUser(function(member, done) {
    done(null, member);
});

var local_signin = require('./passport/strategy/local_signin');

passport.use('local-signin', local_signin);
app.set('passport', passport);


console.log('===== Router Setting =====');
var routes_loader = require('./routes/routes_loader');
var router = express.Router();
routes_loader.init(app, router);

// ===== Page Error Handler ===== //
var expressErrorHandler = require('express-error-handler');
handler = expressErrorHandler({
    handlers: {
        '404' : function err404(err, req, res, next) {
            return res.render('error/404.ejs', {member: req.user});
        }
    }
});

app.use(expressErrorHandler.httpError(404) );
app.use(handler);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('===== Create Server =====');
    console.log('Server : Express WebServer Start driving -> PORT : ' + app.get('port'));
    console.log('Server : Version -> ' + process.version);
    // ===== Database ===== //
    var database_loader = require('./database/database_loader');
    console.log('===== Database Connection =====');
    database_loader.init(app, config);
});
