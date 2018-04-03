const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'endless';

module.exports = {
    mongo : function() {
        return connectMongo(MongoClient, dbUrl, dbName);
    }
}

var connectMongo(mongo, url, db) {
    return new Promise(function(reject, resolve) {
        mongo.connect(url, function(err, client) {
            console.log("Database connectée");
            if (err) return resolve()
            return reject();
            client.close();
        })
    });
};
