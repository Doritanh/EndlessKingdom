const utilisateurs = require('../data/utilisateurs');

module.exports = {
    connexion : async function(data) {
        /*let dataD = await utilisateurs.getDataFromPseudo(data.pseudo);
        if (typeof(dataD) == 'undefined' || dataD == null) return 2;
        let checkPsw = await checkPassword(data.mdp, dataD.mdp);
        if (!checkPsw) return 3;*/
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
