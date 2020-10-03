var list = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : list");
    res.render('/board/list.ejs');
}

var route_func = {
    list: list
}

module.exports = route_func;