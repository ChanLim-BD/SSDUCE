require('dotenv').config();
var kakaoStrategy = require('passport-kakao').Strategy;

module.exports = new kakaoStrategy({
    clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디
    callbackURL: '/member/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소
    }, 
    function(accessToken, refreshToken, profile, done) {
        var database = app.get('database');

        database.MemberModel.findOne({ 'id' : profile.id, 'password': 'kakao_password', 'provider' : 'kakao' }, function(err, member) {
            // err 확인
            if (err) { 
                return done(err); 
            }

            // DB에 멤버가 없을 경우
            if (!member) {
                // DB에 저장
                member = new database.MemberModel({'id':profile.id, 'password': 'kakao_password', 'nick_name':profile.displayName, 'provider': 'kakao'});
                member.save(function(err) {
                    if (err) {
                        console.log("Database : Save Member Error -> " + err);
                    } else {
                        console.log("Database : Save Member Success");
                    }
                    // return done(null, member);
                });
            }

            // 있을 경우
            return done(null, member);
        });
    }
);