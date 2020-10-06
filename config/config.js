var config = {
    server_port: 3000,
    session_param: {
        secret: 'ssduce key',
        resave: false,
        saveUninitialized: false
    },
    db_url: 'mongodb://localhost:27017/ssduce',
    db_schemas: [
        {file:'./schemas/member', collection:'members', schemaName:'MemberSchema', modelName:'MemberModel'}
    ],
    route_list: [
        {file:'./index_route', path:'/', method:'home', type: 'get'},
        {file:'./member_route', path:'/member/signin', method:'signin', type: 'get'},
        {file:'./member_route', path:'/member/signin', method:'signin_post', type: 'post'},
        {file:'./member_route', path:'/member/signout', method:'signout', type: 'get'},
        {file:'./member_route', path:'/member/signup', method:'signup', type: 'get'},
        {file:'./member_route', path:'/member/signup', method:'signup_post', type: 'post'},

        {file:'./board_route', path:'/board', method:'list', type: 'get'},
        {file:'./board_route', path:'/board/write', method:'write', type: 'get'},

        {file:'./worldcup_route', path:'/ideal_worldcup', method:'worldcup', type: 'get'}
    ]
}

module.exports = config;