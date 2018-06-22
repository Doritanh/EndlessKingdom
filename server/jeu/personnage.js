class Personnage {
    constructor(nom, difficulte, classe) {
        this._nom = nom;
        this._difficulte = difficulte;
        this._classe = classe;
        this._maxPV = 10;
        this._PV = 10;
        this._ATK = 5;
    }
}

module.exports = Personnage;