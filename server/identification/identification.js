const requetes = require('../data/requetes');
const password = require('./password');

module.exports = {
    connexion : async function(pseudo, mdp) {
        let id = await requetes.getIDFromPseudo(pseudo);
        if (typeof(id) === 'undefined' || id === null) return 2;
        let mdpID = await requetes.getMdp(id);
        let checkMdp = await password.checkPass(mdp, mdpID);
        if (!checkMdp) return 3;
        return 1;
    },
    inscription : async function(data) {
        /*if (checkBugInscription(data)) return 2;
        if (await utilisateurs.checkPseudoAlreadyExist(data.pseudo)) return 3;
        if (await utilisateurs.checkMailAlreadyExist(data.adresse)) return 4;

        data.mdp = await hashPassword(data.mdp);
        let insertion = await utilisateurs.insererUtilisateur(data);
        if (!insertion) return 5;*/
        return 1;
    }
}
