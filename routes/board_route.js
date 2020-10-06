var list = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : list");
    res.render('./board/list.ejs');
}

var write = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : list");
    res.render('./board/write.ejs');
}

var show = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : show");
    res.render('./board/show.ejs');
}

var route_func = {
    list: list,
    write: write,
    show: show
}

module.exports = route_func;