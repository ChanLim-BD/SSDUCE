var Schema = {};

Schema.createSchema = function(mongoose) {
    var MemberSchema = mongoose.Schema({
        id: {type: String, required: true, index: true, unique: true},
        nick_name: {type: String, required: true},
        password: {type: String, required: true},
        strategy: {type: String, required: true}
    });

    MemberSchema.path('strategy').validate(function(val) {
        switch (val) {
            case 'local':
            case 'kakao':
                return true;
            default:
                return false;
        }
    }, 'Not Supported Strategy');

    MemberSchema.static('findById', function(id) {
        return this.find({id:id});
    });

    MemberSchema.method('authenticate', function(inputText, password) {
        return inputText === password;
    });

    return MemberSchema;
}

module.exports = Schema;