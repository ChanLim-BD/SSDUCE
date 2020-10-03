var worldcup  = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : worldcup");
    res.render('/ideal_worldcup/worldcup.ejs');
}

var route_func = {
    worldcup: worldcup
}

module.exports = route_func;