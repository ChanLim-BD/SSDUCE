var worldcup  = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : worldcup");
    res.render('./ideal_worldcup/worldcup.ejs', {member: req.user});
}

var result =  function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : result");
    
    var databaseModel = app.get('database').WorldCupModel;
    var context = { member: req.user };

    databaseModel.list({}, function(err, results) {
        if (err) {
            context['error'] = err;
        }
        else if (results) {
            context['professors'] = results;
        } else {
            context['professors'] = null;
        }
        return res.render('./ideal_worldcup/result.ejs', context);
    });
    
}

var result_post =  function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : result_post");

    var paramId = req.body.professor_id || req.query.professor_id;

    var databaseModel = app.get('database').WorldCupModel;
    var context = { member: req.user };
    
    databaseModel.winningUpdate(paramId, function(err, results) {
        if (err) {
            context['error'] = err;
            console.error(err);
        }
        return res.redirect('/ideal_worldcup/result');
    });
    
}

// var express = require('express');
// var professorList = express();

// professorList.use(express.json());

// professorList.get('/', function(req, res) {
//     var professorList = require("./professors.json");
//     res.json(professorList);
// })

var list_json = function(req, res) {
    var databaseModel = app.get('database').WorldCupModel;
    var context = { member: req.user };

    databaseModel.list({}, function(err, results) {
        if (err) {
            context['error'] = err;
        }
        else if (results) {
            context['professors'] = results;
        } else {
            context['professors'] = null;
        }
        return res.json(context);
    });
}

var route_func = {
    worldcup: worldcup,
    result: result,
    result_post: result_post,
    list_json: list_json
}

module.exports = route_func;