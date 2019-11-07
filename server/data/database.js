const MongoClient = require('mongodb').MongoClient;

module.exports = {
    connect : function() {
        return mongo(MongoClient);
    },
    nom : function() {
        return  'EndlessKingdom';
    }
}

var mongo = function(mongo) {
    const url = 'mongodb://mongo:27017';
    let promise = new Promise(function(resolve, reject) {
        mongo.connect(url, function(err, client) {
            if (err) return reject();
            if (client) {
                return resolve(client);
            } else {
                return resolve(false);
            }
        })
    });
    return promise;
};
