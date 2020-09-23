var mongoose = require('mongoose');

var database_loader = {};

database_loader.init = function(app, config) {
    console.log('Setting : database_loader.init Start');
    console.log('Database : Connect Preparing');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url, {useNewUrlParser: true, useUnifiedTopology: true});
    database_loader.db = mongoose.connection;

    // ===== Connection Success ===== //
    database_loader.db.on('open', function() {
        console.log('Database : Connection Success -> ' + config.db_url);
        createSchema(app, config);
        console.log('Setting : database_loader.init End');
    });

    // ===== Disconnection  ===== //
    database_loader.db.on('disconnected', function() {
        console.log('Database : Connection WashOut')
    });

    // ===== Connection Error  ===== //
    database_loader.db.on('error', console.error.bind(console, 'Database : mongoose  Connection Error'));
}

function createSchema(app, config) {
    console.log('Database : Number of DB Schemas -> ' + config.db_schemas.length);
    for (var i = 0; i < config.db_schemas.length; i++) {
        var curItem = config.db_schemas[i];
        console.log('Path : %s -> Schema load', curItem.file);
        
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log('Path : %s -> Schema generate', curItem.file);
        
        var curModel = mongoose.model(curItem.collection, curSchema);
        console.log('Path : %s -> [%s] collection define', curItem.file, curItem.collection);
    
        database_loader[curItem.schemaName] = curSchema;
        database_loader[curItem.modelName] = curModel;
        console.log('Database : Schema [%s], Model [%s]', curItem.schemaName, curItem.modelName);
    }
    app.set('database', database_loader);
}

module.exports = database_loader;