var Schema = {};

Schema.createSchema = function(mongoose) {
    var BoardSchema = mongoose.Schema({
        title: {type: String, required: true},
        contents: {type: String, required: true},
        writer: {type: mongoose.Schema.ObjectId, ref: 'members'},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
        hits: {type: Number, default: 0}        
    });

    BoardSchema.statics = {
        list: function(options, callback) {
            this.find(options).populate('writer', 'nick_name').sort({created_at: -1}).exec(callback);
        }, 
        increaseHits: function (id, callback) {
            
        },
        
    }

    return BoardSchema;
}



module.exports = Schema;