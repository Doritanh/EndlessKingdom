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
    getDataFromID : async function(id) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.find({'_id' : id}).toArray(function(err, data) {
                client.close();
                if (err) return reject();
                if (data.length > 0) return resolve(data[0]);
                return resolve(false);
            })
        });
        return promise;
    },
    getMdp : async function(id) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.find({'_id' : id}).toArray(function(err, data) {
                client.close();
                if (err) return reject();
                if (data.length > 0) return resolve(data[0].mdp);
                return resolve(false);
            })
        });
        return promise;
    },
    nouvelUtilisateur : async function(pseudo, mail, mdp) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.insertOne({
                'pseudo' : pseudo,
                'mail' : mail,
                'mdp' : mdp,
                'personnages' : [],
                'donjons' : [],
                'inventaire' : [],
                'score' : 0,
                'actuelDonjon' : 'none',
                'actuelPersonnage' : 'none'
            }, function(err, result) {
                client.close();
                if (err) return reject();
                if (result) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
        return promise;
    },
    ajouterPersonnage : async function(id, personnage) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.update({'_id' : id}, {$push : {'personnages' : personnage}}, function(err, result) {
                client.close();
                if (err) return reject();
                if (result) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
        return promise;
    },
    ajouterDonjon : async function(id, donjon) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.update({'_id' : id}, {$push : {'donjons' : donjon}}, function(err, result) {
                client.close();
                if (err) return reject();
                if (result) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
        return promise;
    },
    setDonjonActuel : async function(id, niveau) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.update({'_id' : id}, {$set : {'actuelDonjon' : niveau}
        }, function(err, result) {
                client.close();
                if (err) return reject();
                if (result) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
        return promise;
    },
    setPersonnageActuel : async function(id, personnage) {
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.update({'_id' : id}, {$set : {'actuelPersonnage' : personnage}
        }, function(err, result) {
                client.close();
                if (err) return reject();
                if (result) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
        return promise;
    },
    setModeDonjon : async function(id, niveauDonjon, mode) {
        let field = 'donjons.' + niveauDonjon + '_mode';
        const client = await database.connect();
        const collection =  client.db(database.nom()).collection('utilisateurs');
        let promise = new Promise(function(resolve, reject) {
            collection.update({'_id' : id, 'donjons._niveau' : niveauDonjon}, {$set : {'donjons.$._mode' : mode}
        }, function(err, result) {
                client.close();
                if (err) return reject();
                if (result) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
        return promise;
    }
}
