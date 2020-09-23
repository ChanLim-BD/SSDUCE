var Schema = {};

Schema.createSchema = function(mongoose) {
    var MemberSchema = mongoose.Schema({
        id: {type: String, required: true},
        nick_name: {type: String, required: true},
        password: {type: String, required: true}
    });

    MemberSchema.static('findById', function(id) {
        return this.find({id:id});
    });

    return MemberSchema;
}

module.exports = Schema;