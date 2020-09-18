var routes_loader = {};

var config = require('../config/config');

// Load routers from config file.
routes_loader.init = function(app, router) {
    console.log('Setting : route_loader.init Start');
    console.log('Router : Number of Routers -> ' + config.route_list.length);
    for (var i = 0; i < config.route_list.length; i++) {
        var curItem = config.route_list[i];
        var curModule = require(curItem.file);
        if(curItem.type == 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
            console.log('Path : ' + curItem.path + ' -> init SUCCESS(GET)!' );
        } else if(curItem.type == 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
            console.log('Path : ' + curItem.path + ' -> init SUCCESS(POST)!' );
        } 
    }
    app.use('/', router);   
    console.log('Setting : route_loader.init End');
}

module.exports = routes_loader;