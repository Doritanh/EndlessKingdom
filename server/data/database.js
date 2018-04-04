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
        mongo.connect(url, function(err, client) {
            console.log("Connect mongo");
            if (err) return resolve()
            return reject();
            client.close();
        })
    });
    return promise;
};
