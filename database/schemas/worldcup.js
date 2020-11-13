var Schema = {};

Schema.createSchema = function(mongoose) {
    var WorldCupSchema = mongoose.Schema({
        name: {type: String, required: true},
        image: {type: String},
        resultImage: {type: String},
        subject: {type: Array},
        winning: {type: Number, default: 0},
    });

    WorldCupSchema.statics = {
        list: function(options, callback) {
            this.find(options).sort({winning: 'desc'}).exec(callback);
        }, 
        winningUpdate: function(id, callback) {
            let update = {$inc: {winning:1}};
            this.findByIdAndUpdate(id, update, {useFindAndModify: false}).exec(callback);
        }
    }

    return WorldCupSchema;
}

module.exports = Schema;