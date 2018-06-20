import {Modele} from '../modele.js';

export class ModeleMenu extends Modele{
    constructor(socket) {
        super(socket);
        this._personnages = [];
        this._donjons = [];
    }

    setPersonnages(personnages) {
        this._personnages = personnages;
    }

    setDonjons(donjons) {
        this._donjons = donjons;
    }
}

ModeleMenu.prototype.creerDonjon = function() {
    this._socket.send(JSON.stringify({
        'id' : 'creerDonjon',
        'values' : {}
    }));
}

ModeleMenu.prototype.lancerDonjon = function(niveau) {
    this._socket.send(JSON.stringify({
        'id' : 'lancerDonjon',
        'values' : {
            'id' : niveau
        }
    }));
}