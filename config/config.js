var config = {
    server_port: 3000,
    session_param: {
        secret: 'ssduce key',
        resave: false,
        saveUninitialized: false
    },
    db_url: 'mongodb://localhost:27017/ssduce',
    db_schemas: [
        {file:'./schemas/member', collection:'members', schemaName:'MemberSchema', modelName:'MemberModel'},
        {file:'./schemas/board', collection:'posts', schemaName:'BoardSchema', modelName:'BoardModel'},
        {file:'./schemas/worldcup', collection:'professors', schemaName:'WorldCupSchema', modelName:'WorldCupModel'}
    ],
    db_initial_data: [
        // {file:'../config/initial_data/member', collection:'members', modelName:'MemberModel', initial_after_drop: false},
        // {file:'../config/initial_data/board', collection:'posts', modelName:'BoardModel', initial_after_drop: false},
        {file:'../config/initial_data/professors', collection:'professors', modelName:'WorldCupModel', initial_after_drop: true}
    ],
    route_list: [
        {file:'./index_route', path:'/', method:'home', type: 'get'},
        {file:'./member_route', path:'/member/signin', method:'signin', type: 'get'},
        {file:'./member_route', path:'/member/signin', method:'signin_post', type: 'post'},
        {file:'./member_route', path:'/member/signout', method:'signout', type: 'get'},
        {file:'./member_route', path:'/member/signup', method:'signup', type: 'get'},
        {file:'./member_route', path:'/member/signup', method:'signup_post', type: 'post'},

        {file:'./member_route', path:'/member/kakao', method:'kakao', type: 'get'},
        {file:'./member_route', path:'/member/kakao/callback', method:'kakao_callback', type: 'get'},
        
        {file:'./member_route', path:'/member/signup_failure', method:'signup_failure', type: 'get'},
        {file:'./member_route', path:'/member/signup_success', method:'signup_success', type: 'get'},
        {file:'./member_route', path:'/member/signin_failure', method:'signin_failure', type: 'get'},

        {file:'./board_route', path:'/board', method:'list', type: 'get'},
        {file:'./board_route', path:'/board/write', method:'write', type: 'get'},
        {file:'./board_route', path:'/board/write', method:'write_post', type: 'post'},
        {file:'./board_route', path:'/board/show', method:'show', type: 'get'},

        {file:'./worldcup_route', path:'/ideal_worldcup', method:'worldcup', type: 'get'},
        {file:'./worldcup_route', path:'/ideal_worldcup/result', method:'result', type: 'get'},
        {file:'./worldcup_route', path:'/ideal_worldcup/result', method:'result_post', type: 'post'},
        {file:'./worldcup_route', path:'/ideal_worldcup/professors', method:'list_json', type: 'get'}
    ]
}

module.exports = config;