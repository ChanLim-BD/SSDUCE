var config = {
    server_port: 3000,
    session_param: {
        secret: 'ssduce key',
        resave: false,
        saveUninitialized: false
    },
    route_list: [
        {file:'./index_route', path:'/', method:'home', type: 'get'}
    ]
}

module.exports = config;