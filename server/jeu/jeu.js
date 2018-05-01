'use strict';

const requetes = require('../data/requetes');

module.exports = {
    getStatus : async function(pseudo) {
        let id = await requetes.getIDFromPseudo(pseudo);
        let data = await requetes.getDataFromID(id);
        if (aucunPersonnage(data.personnages)) {
            return STATUS_CODE.NO_PERSONNAGE;
        }
        return false;
    }
}

let aucunPersonnage = function(personnages) {
    let existe = false;
    if (typeof personnages !== 'undefined') {
        existe = true;
    }
    return existe;
}

const STATUS_CODE = {
    NO_PERSONNAGE : "NO_PERSONNAGE",
    MENU : 'MENU',
    DONJON : 'DONJON'
}