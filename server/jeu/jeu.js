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

Jeu.prototype.ajouterDonjon = async function() {
    let data = await requetes.getDataFromID(await requetes.getIDFromPseudo(this._pseudo));
    if (!data) return 0;
    let niveau = data.donjons.length;
    let terrain = donjon.nouveauTerrain(10);
    requetes.ajouterDonjon(data._id, terrain);
    requetes.setDonjonActuel(data._id, niveau);
    return terrain;
}