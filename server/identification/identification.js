const requetes = require('../data/requetes');
const password = require('./password');

module.exports = {
    /**
     *  Connexion d'un utilisateurs
     *  @async
     *  @param {string} pseudo - Pseudo de l'utilisateur
     *  @param {string} mdp - Le mot de passe non crypté de l'utilisateur
     *  @return {number} - Codes de reussite ou d'erreurs
     */
    connexion : async function(pseudo, mdp) {
        let id = await requetes.getIDFromPseudo(pseudo);
        if (!id) return 2;
        let mdpID = await requetes.getMdp(id);
        let checkMdp = await password.check(mdp, mdpID);
        if (!checkMdp) return 3;
        return 1;
    },
    /**
     *  Inscription d'un utilisateur
     *  @async
     *  @param {string} pseudo - Pseudo de l'utilisateur
     *  @param {string} mail - Mail de l'utilisateur
     *  @param {string} mdp - Mot de passe de l'utilisateur
     *  @param {string} mdpConfirm - Mot de passe de confirmation de l'utilisateur
     *  @return {number} - Codes de reussite ou d'erreurs
     */
    inscription : async function(pseudo, mail, mdp, mdpConfirm) {
        if (mdp !== mdpConfirm) return 2;
        if (await requetes.getIDFromPseudo(pseudo)) return 3;
        if (await requetes.getIDFromMail(mail)) return 4;
        let mdpHash = await password.hash(mdp);
        let insertion = await requetes.nouvelUtilisateur(pseudo, mail, mdpHash);
        if (!insertion) return 5;
        return 1;
    }
}
