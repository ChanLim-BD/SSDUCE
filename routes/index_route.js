var home = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : home");
    return res.render('index.ejs');  
}

var route_func = {
    home: home
}

module.exports = route_func;