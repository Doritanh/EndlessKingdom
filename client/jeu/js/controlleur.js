/*
**  Fichier controlleur du jeu
**
*/
import { VueMenu } from './menu/vueMenu.js';
import { VueCreationPerso } from './menu/vueCreationPerso.js';
import { VueErreur } from './erreur/vueErreur.js';
import { VueEcran } from './ecran/vueEcran.js';
import { ModeleMenu } from './menu/modeleMenu.js';
import { ModeleCreationPerso } from './menu/modeleCreationPerso.js';
import { ModeleErreur } from './erreur/modeleErreur.js';
import { ModeleEcran } from './ecran/modeleEcran.js';

export class Controlleur {
    constructor() {
        // Actions du joueur
        this._clavier = {
            haut : false,
            bas : false,
            gauche : false,
            droite : false
        };
        // Modeles & Vues
        this._modeles = {
            menu : new ModeleMenu(),
            creationPerso : new ModeleCreationPerso(),
            erreur : new ModeleErreur(),
            ecran : new ModeleEcran()
        };
        this._vues = {
            menu : new VueMenu(modeles.menu),
            creationPerso : new VueCreationPerso(modeles.creationPerso),
            erreur : new VueErreur(),
            ecran : new VueEcran()
        }
        // Ecoute des evenements du clavier
        keyboardEvents(this);
    }
}

Controlleur.prototype.afficher = function(vue) {
    for (let vue in _vues) {
        vues[vue].cacher();
    }
    this._vues[vue].afficher();
}

Controlleur.prototype.menu = function() {
    return {
        vue : this._vues.menu,
        modele : this._modeles.menu
    }
}

Controlleur.prototype.creationPerso = function() {
    return {
        vue : this._vues.creationPerso,
        modele : this._modeles.creationPerso
    }
}

Controlleur.prototype.erreur = function() {
    return {
        vue : this._vues.erreur,
        modele : this._modeles.erreur
    }
}

Controlleur.prototype.ecran = function() {
    return {
        vue : this._vues.ecran,
        modele : this._modeles.ecran
    }
}

let keyboardEvents = function(this) {
    window.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                this._clavier.haut = true;
                break;
            case 'ArrowDown':
                this._clavier.bas = true;
                break;
            case 'ArrowLeft' :
                this._clavier.gauche = true;
                break;
            case 'ArrowRight':
                this._clavier.droite = true;
                break;
        }
    });
    window.addEventListener('keyup', event => {
        switch (event.key) {
            case 'ArrowUp':
                this._clavier.haut = false;
                break;
            case 'ArrowDown':
                this._clavier.bas = false;
                break;
            case 'ArrowLeft' :
                this._clavier.gauche = false;
                break;
            case 'ArrowRight':
                this._clavier.droite = false;
                break;
        }
    });
}