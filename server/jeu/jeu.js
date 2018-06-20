'use strict';

const requetes = require('../data/requetes');
const donjon = require('./donjon.js');

class Jeu {
    constructor() {
        this._pseudo = 'undefined';
    }

    setPseudo(pseudo) {
        this._pseudo = pseudo;
    }
}

module.exports = Jeu;

Jeu.prototype.getStatus = async function() {
    let id = await requetes.getIDFromPseudo(this._pseudo);
    let data = await requetes.getDataFromID(id);
    if (!data) return STATUS_CODE.ERROR;
    if (data.personnages.length === 0) {
        return STATUS_CODE.NO_PERSONNAGE;
    } else if (typeof data.donjons.actuel !== 'undefined') {
        if (data.donjons.actuel !== 'none') {
            return STATUS_CODE.DONJON;
        }
    }
    return STATUS_CODE.MENU;
}

Jeu.prototype.getInfosMenu = async function() {
    let id = await requetes.getIDFromPseudo(this._pseudo);
    let data = await requetes.getDataFromID(id);
    if (!data) return STATUS_CODE.ERROR;
    return {
        personnages : data.personnages,
        donjons : data.donjons
    };
}

Jeu.prototype.ajouterPerso = async function(nom, difficulte) {
    let id = await requetes.getIDFromPseudo(this._pseudo);
    let data = await requetes.getDataFromID(id);
    if (data.personnages.length === 0) {
        requetes.ajouterPersonnage(id, nom, difficulte);
    }
}

Jeu.prototype.ajouterDonjon = async function() {
    let data = await requetes.getDataFromID(await requetes.getIDFromPseudo(this._pseudo));
    if (!data) return 0;
    let niveau = data.donjons.length;
    let terrain = donjon.nouveauTerrain(10);
    requetes.ajouterDonjon(data._id, terrain);
    requetes.setDonjonActuel(data._id, niveau);
    return terrain;
}

const STATUS_CODE = {
    ERROR : 'ERROR',
    NO_PERSONNAGE : 'NO_PERSONNAGE',
    MENU : 'MENU',
    DONJON : 'DONJON'
}