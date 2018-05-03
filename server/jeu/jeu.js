'use strict';

const requetes = require('../data/requetes');

module.exports = {
    getStatus : async function(pseudo) {
        let id = await requetes.getIDFromPseudo(pseudo);
        let data = await requetes.getDataFromID(id);
        if (data.personnages.length === 0) {
            return STATUS_CODE.NO_PERSONNAGE;
        }
        return STATUS_CODE.MENU;
    },
    ajouterPerso : async function(pseudo, nom, difficulte) {
        let id = await requetes.getIDFromPseudo(pseudo);
        try {
            requetes.ajouterPersonnage(id, nom, difficulte);
        } catch (e) {
            console.log(e);
        }
    }
}

const STATUS_CODE = {
    NO_PERSONNAGE : "NO_PERSONNAGE",
    MENU : 'MENU',
    DONJON : 'DONJON'
}