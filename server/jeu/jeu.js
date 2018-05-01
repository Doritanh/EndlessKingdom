'use strict';

const requetes = require('../data/requetes');

module.exports = {
    getMenu : async function(pseudo) {
        let menu = {};
        let id = await requetes.getIDFromPseudo(pseudo);
        let data = await requetes.getDataFromID(id);
        menu.personnages = personnages(data.personnages);
        return menu;
    }
}

let personnages = function(personnages) {
    let content = {};
    if (typeof personnages !== 'undefined') {
        content.vide = false;
        console.log("personnage > 0")
    } else {
        content.vide = true;
    }
    return content;
}