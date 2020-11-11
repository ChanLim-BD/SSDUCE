var worldcup  = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : worldcup");
    res.render('./ideal_worldcup/worldcup.ejs', {member: req.user});
}

var result =  function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : result");
    res.render('./ideal_worldcup/result.ejs', {member: req.user});
}

// var express = require('express');
// var professorList = express();

// professorList.use(express.json());

// professorList.get('/', function(req, res) {
//     var professorList = require("./professors.json");
//     res.json(professorList);
// })

var professorList = function(req, res) {
    var professorList = require("./professors.json");
    res.json(professorList);
    console.log(professorList);
}

var route_func = {
    worldcup: worldcup,
    result: result,
    professorList: professorList
}

module.exports = route_func;