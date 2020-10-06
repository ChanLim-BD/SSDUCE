var kakaoStrategy = require('passport-kakao').Strategy;

kakaoStrategy.post('/', function(req, id, password, next){
    // POST /oauth/token HTTP/1.1
    // Host: kauth.kakao.com
    // Content-type: application/x-www-form-urlencoded;charset=utf-8
})

module.exports = kakaoStrategy;