export class Clavier {
    constructor() {
        this.HAUT = 38;
        this.BAS = 40;
        this.GAUCHE = 37;
        this.DROITE = 39;
        this.ECHAP = 27;
        this.pression = {};
    }

    addTouche(touche) {
        this.pression[touche] = true;
        console.log(this.pression)
    }

    removeTouche(touche) {
        delete this.pression[touche];
    }

    estAppuye(touche) {
        return this.pression[touche];
    }

}