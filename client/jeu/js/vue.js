export class Vue {
    constructor(modele) {
        this._modele = modele;
        this._element = null;
    }

    afficher() {
        this.rafraichir();
        this._element.style.display = "block";
    }

    cacher() {
        this._element.style.display = "none";
    }

    rafraichir() {}
}