export class Vue {
    constructor(modele) {
        this._modele = modele;
        this._element = null;
        this._active = false;
    }

    afficher() {
        this.rafraichir();
        this._element.style.display = "block";
        this._active = true;
    }

    cacher() {
        this._element.style.display = "none";
        this._active = false;
    }

    rafraichir() {}
}