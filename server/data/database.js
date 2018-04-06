const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'EndlessKingdom';

module.exports = {
    mongo : function() {
        return connectMongo(MongoClient, dbUrl, dbName);
    },
    dbName : function() {
        return dbName;
    }
}

var connectMongo = function(mongo, url, db) {
    let promise = new Promise(function(reject, resolve) {
        mongo.connect(dbUrl, function(err, client) {
            if (err) return reject()
            const db = client.db(dbName);
            if (db) return resolve(db);
            console.log("Connect mongo");
            client.close();
        })
    });
    return promise;
};
