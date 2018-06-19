import {Modele} from '../modele.js';

export class ModeleMenu extends Modele{
    constructor() {
        super();
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