var worldcup  = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : worldcup");
    res.render('./ideal_worldcup/worldcup.ejs', {member: req.user});
}

var result = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : result");
    res.render('./ideal_worldcup/result.ejs');
}

var route_func = {
    worldcup: worldcup,
    result: result
}

module.exports = route_func;