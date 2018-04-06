const requetes = require('../data/requetes');
const password = require('./password');

module.exports = {
    /**
     *  Connexion d'un utilisateurs
     *  @param {string} pseudo - Pseudo de l'utilisateur
     *  @param {string} mdp - Le mot de passe non crypté de l'utilisateur
     *  @return {number} - Codes de reussite ou d'erreurs
     */
    connexion : async function(pseudo, mdp) {
        let id = await requetes.getIDFromPseudo(pseudo);
        if (!id) return 2;
        let mdpID = await requetes.getMdp(id);
        let checkMdp = await password.checkPass(mdp, mdpID);
        if (!checkMdp) return 3;
        return 1;
    },
    /**
     *  Inscription d'un utilisateur
     *  @param {string} pseudo - Pseudo de l'utilisateur
     *  @param {string} mail - Mail de l'utilisateur
     *  @param {string} mdp - Mot de passe de l'utilisateur
     *  @param {string} mdpConfirm - Mot de passe de confirmation de l'utilisateur
     *  @return {number} - Codes de reussite ou d'erreurs
     */
    inscription : async function(pseudo, mail, mdp, mdpConfirm) {
        if (mdp !== mdpConfirm) return 2;
        /*if (checkBugInscription(data)) return 2;
        if (await utilisateurs.checkPseudoAlreadyExist(data.pseudo)) return 3;
        if (await utilisateurs.checkMailAlreadyExist(data.adresse)) return 4;

        data.mdp = await hashPassword(data.mdp);
        let insertion = await utilisateurs.insererUtilisateur(data);
        if (!insertion) return 5;*/
        return 1;
    }
}
