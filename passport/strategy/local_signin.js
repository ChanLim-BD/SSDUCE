
var localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy({		
        usernameField : 'id',
        passwordField : 'password',
        passReqToCallback : true   
    }, 
    function(req, id, password, done) {
        var database = app.get('database');
        database.MemberModel.findOne({ 'id' : id, 'provider' : 'local' }, function(err, member) {
            if (err) {
                return done(err);
            }

            if (!member) {
                return done(null, false);
            }

            var authenticated = member.authenticate(password, member._doc.password);

            if (!authenticated) {
                return done(null, false);
            } else {
                return done(null, member);
            }

        });
    }
);