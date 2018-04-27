'use strict';

module.exports = class Sessions {
    constructor() {
        this.map = new Map();
    }

    ajouter(pseudo) {
        let id = 0;
        do {
            id = Math.floor(Math.random() * 1000000000);
        } while(this.map.has(id));
        this.map.set(id, pseudo);
        return id;
    };

    supprimer(id) {
        this.map.delete(id);
    }

    get(id) {
        return this.map.get(id);
    }
}