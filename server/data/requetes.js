const database = require('./database')

module.exports = {
    getIDFromPseudo : async function(pseudo) {
        const db = await database.mongo();
        const collection = db.collection(database.dbName());
        let promise = new Promise(function(resolve, reject) {
            collection.find({'pseudo' : pseudo}).toArray(function(err, data) {
                if (err) return reject();
                console.log(data)
                if (data.length > 0) return resolve(data[0]._id);
                return resolve(false);
            });
        });
        return promise;
    },
    getIDFromMail : async function(mail) {
        const db = await database.mongo();
        const collection = db.collection(database.dbName());
        let promise = new Promise(function(resolve, reject) {
            collection.find({'mail' : mail}).toArray(function(err, data) {
                if (err) return reject();
                console.log(data)
                if (data.length > 0) return resolve(data[0]._id);
                return resolve(false);
            });
        });
        return promise;
    }
}
