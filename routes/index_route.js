var home = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : home");
    res.render('index.ejs', {member: req.user});  
}

var route_func = {
    home: home
}

module.exports = route_func;