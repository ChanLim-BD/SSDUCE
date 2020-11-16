var kakaoStrategy = require('passport-kakao').Strategy;

// kakaoStrategy.post('/', function(req, id, password, next){
//     // POST /oauth/token HTTP/1.1
//     // Host: kauth.kakao.com
//     // Content-type: application/x-www-form-urlencoded;charset=utf-8
// })

// module.exports = kakaoStrategy;

module.exports = new kakaoStrategy({
    clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디
    callbackURL: '/member/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소
    }, 
    function(req, id, password, done) {
        var database = app.get('database');
        database.MemberModel.findOne({ 'id' : id, 'provider' : 'kakao' }, function(err, member) {
            // 기존에 카카오로 로그인한 사용자가 있는지 조회
            if (err) { 
                return done(err); // 있다면 done
            }

            if (!member) {
                return done(null, false);
            }

            var authenticated = member.authenticate(password, member._doc.password);

            if (!authenticated) {
                return done(null, false);
            } else {
                return done(null, member);
            }

        });
    }


)