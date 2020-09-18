var home = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : home");
    res.send("Express Server is running!!!");  
}

var route_func = {
    home: home
}

module.exports = route_func;