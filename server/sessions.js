'use strict';

module.exports =  class Sessions {
    constructor() {
        this.liste = {};
    }

    ajouter(pseudo) {
        let id = 0;
        do {
            id = Math.floor(Math.random() * 1000000000);
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