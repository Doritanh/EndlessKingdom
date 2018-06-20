'use strict';

module.exports =  class Sessions {
    constructor() {
        this.liste = {};
    }

    ajouter(pseudo) {
        let id = 0;
        do {
            id = generateID(pseudo);
        } while (this.has(id));
        this.liste[id] = pseudo;
        return id;
    }

    supprimer(id) {
        this.liste[id] = null;
    }

    get(id) {
        return this.liste[id];
    }

    has(id) {
        let has = false;
        if (this.liste.hasOwnProperty(id)) {
            if (this.liste[id] !== null) {
                has = true;
            }
        }
        return has;
    }
}

let generateID = function(pseudo) {
    let id = "";
    let valTab = createValTab();
    id = "";
    let idLength = Math.floor(Math.random()*200);
    while (idLength < 50) {
        idLength = Math.floor(Math.random()*200);
    }
    for(let i = 0; i < idLength; i++) {
        id += valTab[Math.floor(Math.random() * 10)];
    }
    return Math.floor(id);
}

let createValTab = function() {
    let tab = [];
    for(let i = 0; i<10; i++) {
        let value;
        do {
            value = Math.floor(Math.random() * 10);
        } while(tab.includes(value));
        tab[i] = value;
    }
    return tab;
}