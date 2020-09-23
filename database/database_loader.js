var mongoose = require('mongoose');

var database_loader = {};

database_loader.init = function(app, config) {
    console.log('Setting : database_loader.init Start');
    console.log('Database : Connect Preparing');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url, {useNewUrlParser: true, useUnifiedTopology: true});
    database_loader = mongoose.connection;
    // ===== Connection Success ===== //
    database_loader.on('open', function() {
        console.log('Database : Connection Success -> ' + config.db_url);
        database_loader.db.admin().buildInfo(function (err, info) {
            if (err) return database_loader.error();
            console.log('Database : Version -> ' + info.version);
            createSchema(app, config);
            console.log('Setting : database_loader.init End');
         });
    });

    // ===== Disconnection  ===== //
    database_loader.on('disconnected', function() {
        console.log('Database : Connection WashOut')
    });

    // ===== Connection Error  ===== //
    database_loader.on('error', console.error.bind(console, 'Database : Connection Error'));
}

function createSchema(app, config) {
    console.log('Database : Number of DB Schemas -> ' + config.db_schemas.length);
    for (var i = 0; i < config.db_schemas.length; i++) {
        var curItem = config.db_schemas[i];
        console.log('Schema : %s -> Schema load', curItem.file);
        
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log('Schema : %s -> Schema generate', curItem.file);
        
        var curModel = mongoose.model(curItem.collection, curSchema);
        console.log('Schema : %s -> [%s] collection define', curItem.file, curItem.collection);
    
        database_loader[curItem.schemaName] = curSchema;
        database_loader[curItem.modelName] = curModel;
        console.log('Database : Schema [%s], Model [%s]', curItem.schemaName, curItem.modelName);
    }
    app.set('database', database_loader);
}

module.exports = database_loader;