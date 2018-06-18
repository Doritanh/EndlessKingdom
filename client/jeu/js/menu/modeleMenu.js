export class ModeleMenu {
    constructor() {
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