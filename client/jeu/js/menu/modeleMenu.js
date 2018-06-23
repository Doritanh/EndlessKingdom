import {Modele} from '../modele.js';

export class ModeleMenu extends Modele{
    constructor(socket) {
        super(socket);
        this._personnages = {};
        this._donjons = {};
        this._actuelPersonnage = 0;
        this._nomCompte = '';
    }

    setPersonnages(personnages) {
        this._personnages = personnages;
    }

    setDonjons(donjons) {
        this._donjons = donjons;
    }

    setActuelPersonnage(actuelPersonnage) {
        this._actuelPersonnage = actuelPersonnage;
    }

    setCompte(nom) {
        this._nomCompte = nom;
    }
}

ModeleMenu.prototype.creerDonjon = function() {
    this._socket.send(JSON.stringify({
        'id' : 'creerDonjon',
        'values' : {}
    }));
}

ModeleMenu.prototype.lancerDonjon = function(niveau, personnage) {
    this._socket.send(JSON.stringify({
        'id' : 'lancerDonjon',
        'values' : {
            'niveau' : niveau,
            'personnage' : personnage
        }
    }));
}

ModeleMenu.prototype.creerPerso = function() {
    this._socket.send(JSON.stringify({
        'id' : 'demandePerso',
        'values' : {}
    }));
}

ModeleMenu.prototype.changerPerso = function(modifier) {
    let selected = this._actuelPersonnage + modifier;
    this._socket.send(JSON.stringify({
        'id' : 'selectionnerPerso',
        'values' : {
            'selected' : selected
        }
    }));
}