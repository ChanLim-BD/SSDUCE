const passport = require("passport");

// ===== signin - View Login Page ===== //
var signin = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signin");
    if (req.isAuthenticated()) {
        return res.redirect('/');
    } else {
        return res.render('member/signin.ejs', {member: req.user});  
    }
}

// ===== signin_post - Authenticate Member Info ===== //
var signin_post = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signin_post");

    var passport = app.get('passport');
    passport.authenticate('local-signin', function(err, member) {
        if (err) {
            console.log('Passport : Authenticate Error -> ' + err);
            return res.redirect('/500');
        }

        if  (!member) {
            console.log('Passport : Authenticate Fail -> Undefined Member');
            return res.send({signin_post: false});
        } else {
            req.login(member, function(err) {
                if (err) {
                    console.log('Passport : Signin Error -> ' + err);
                    return res.redirect('/500');
                } else {
                    return res.redirect('/');
                }   
            });
        }
    })(req, res);
}

// ===== signout - Signout Member ===== //
var signout = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signout");
    req.logout();
    res.render('member/signout.ejs', {member: req.user}); 
}

// ===== signup - View Signup Page ===== //
var signup = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signup");
    if (req.isAuthenticated()) {
        return res.redirect('/');
    } else {
        return res.render('member/signup.ejs', {member: req.user}); 
    }
}

// ===== signup_post - Create Memeber Info ===== //
var signup_post = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signup_post");

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramNickname = req.body.nick_name || req.query.nick_name;
    
    var database = app.get('database');
    database.MemberModel.findOne({'id':paramId}, function(err, member) {
        if (err) {
            console.log("Database : Authenticate Error -> " + err);
            return res.redirect('/500');
        }
        if (member) {
            console.log("Database : Save Member Fail -> Duplicated ID");
            return res.send({signup_post: "fail"});
        } else {
            member = new database.MemberModel({'id':paramId, 'password':paramPassword, 'nick_name':paramNickname , 'provider':'local'});
            member.save(function(err) {
                if (err) {
                    console.log("Database : Save Member Error -> " + err);
                    return res.send({signup_post: err});
                } else {
                    console.log("Database : Save Member Success");
                    return res.send({signup_post: 'success'});
                }
            });
        }
    });  
}

var kakao = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : kakao");

    passport.authenticate('kakao-signin');
}

var kakao_callback = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : kakao_callback");

    passport.authenticate('kakao-signin', {
        successRedirect: '/',
        failureRedirect: '/member/signin_failure',
    });

    //res.redirect('/');
}

var signup_failure = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signup_failure");
    res.render('./member/signup_failure.ejs', {member: req.user});
}

var signup_success = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signup_success");
    res.render('./member/signup_success.ejs', {member: req.user});
}

var signin_failure = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : signin_failure");
    res.render('./member/signin_failure.ejs', {member: req.user});
}

var route_func = {
    signin: signin,
    signin_post: signin_post,
    signout: signout,
    signup: signup,
    signup_post: signup_post,
    kakao: kakao,
    kakao_callback: kakao_callback,
    signup_failure: signup_failure,
    signup_success: signup_success,
    signin_failure: signin_failure
}

module.exports = route_func;