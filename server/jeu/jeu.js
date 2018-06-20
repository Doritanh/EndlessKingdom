'use strict';

const requetes = require('../data/requetes');
const donjon = require('./donjon.js');

module.exports = {
    listeStatus : function() {
        return STATUS_CODE;
    },
    getStatus : async function(pseudo) {
        let id = await requetes.getIDFromPseudo(pseudo);
        let data = await requetes.getDataFromID(id);
        if (!data) return STATUS_CODE.ERROR;
        if (data.personnages.length === 0) {
            return STATUS_CODE.NO_PERSONNAGE;
        }
        return STATUS_CODE.MENU;
    },
    getInfosMenu : async function(pseudo) {
        let id = await requetes.getIDFromPseudo(pseudo);
        let data = await requetes.getDataFromID(id);
        if (!data) return STATUS_CODE.ERROR;
        return {
            personnages : data.personnages,
            donjons : data.donjons
        };
    },
    ajouterPerso : async function(pseudo, nom, difficulte) {
        let id = await requetes.getIDFromPseudo(pseudo);
        let data = await requetes.getDataFromID(id);
        if (data.personnages.length === 0) {
            requetes.ajouterPersonnage(id, nom, difficulte);
        }
    },
    genererDonjon : function() {
        return donjon.generer(10);
    }
}

const STATUS_CODE = {
    ERROR : 'ERROR',
    NO_PERSONNAGE : 'NO_PERSONNAGE',
    MENU : 'MENU',
    DONJON : 'DONJON'
}