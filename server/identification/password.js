const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    check : async function(mdp, mdpHash) {
        let promise = new Promise(function(resolve, reject) {
            bcrypt.compare(mdp, mdpHash, function(err, res) {
                if (err) return reject();
                return resolve(res);
            });
        });
        return promise;
    },
    hash : async function(mdp) {
        let promise = new Promise(function(resolve, reject) {
            bcrypt.hash(mdp, saltRounds, function(err, hash) {
                if (err) return reject();
                return resolve(hash);
            });
        });
        return promise;
    }
}
