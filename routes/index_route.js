var home = function(req, res, next) {
    console.log("===== Router Call =====");
    console.log("Router : home");
    res.render('index.ejs');  
}

var route_func = {
    home: home
}

module.exports = route_func;