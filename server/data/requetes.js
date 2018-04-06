const database = require('./database')

module.exports = {
    getIDFromPseudo : async function(pseudo) {
        const client = await database.connect();
        const collection = client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.find({'pseudo' : pseudo}).toArray(function(err, data) {
                client.close();
                if (err) return reject();
                if (data.length > 0) return resolve(data[0]._id);
                return resolve(false);
            });
        });
        return promise;
    },
    getIDFromMail : async function(mail) {
        const client = await database.connect();
        const collection = client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.find({'mail' : mail}).toArray(function(err, data) {
                client.close();
                if (err) return reject();
                if (data.length > 0) return resolve(data[0]._id);
                return resolve(false);
            });
        });
        return promise;
    },
    getMdp : async function(id) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.find({'id' : id}).toArray(function(err, data) {
                client.close();
                if (err) return reject();
                if (data.length > 0) return resolve(data[0].mdp);
                return resolve(false);
            })
        })
    },
    nouvelUtilisateur : async function(pseudo, mail, mdp) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.insertOne({
                'pseudo' : pseudo,
                'mail' : mail,
                'mdp' : mdp,
                'personnages' : {},
                'donjons' : {},
                'inventaire' : {},
                'score' : 0
            }, function(err, result) {
                client.close();
                if (err) return reject();
                return resolve(true);
            });
        });
        return promise;
    }
}
