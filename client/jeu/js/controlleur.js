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
    constructor(socket) {
        // Actions du joueur
        this._clavier = {
            haut : false,
            bas : false,
            gauche : false,
            droite : false,
            space : false
        };
        // Modeles & Vues
        this._modeles = {
            menu : new ModeleMenu(socket),
            creationPerso : new ModeleCreationPerso(socket),
            erreur : new ModeleErreur(socket),
            ecran : new ModeleEcran(socket)
        };
        this._vues = {
            menu : new VueMenu(this._modeles.menu),
            creationPerso : new VueCreationPerso(this._modeles.creationPerso),
            erreur : new VueErreur(this._modeles.erreur),
            ecran : new VueEcran(this._modeles.ecran)
        };
        for (let vue in this._vues) {
            this._vues[vue].cacher();
        }
        // Ecoute des evenements du clavier
        keyboardEvents(this);
    }
}

Controlleur.prototype.setStatus = function(content) {
    let status = content.status;
    let contenu = content.contenu;
    for (let vue in this._vues) {
        this._vues[vue].cacher();
    }
    switch (status) {
        case 'ERROR':
            this._vues.erreur.afficher();
            break;
        case 'NO_PERSONNAGE':
            this._vues.creationPerso.afficher();
            break;
        case 'MENU':
            this._modeles.menu.setPersonnages(contenu.personnages);
            this._modeles.menu.setDonjons(contenu.donjons);
            this._modeles.menu.setActuelPersonnage(contenu.actuelPersonnage);
            this._vues.menu.afficher('menu');
            break;
        case 'DONJON':
            this._modeles.ecran.setDonjon(contenu.donjon);
            this._modeles.ecran.setPersonnage(contenu.personnage);
            this._vues.ecran.dessiner();
            this._vues.ecran.afficher('ecran');
            break;
    }
}

let keyboardEvents = function(controlleur) {
    window.addEventListener('keydown', event => {
        if (controlleur._vues.ecran._active == true) {
            switch (event.code) {
                case 'ArrowUp':
                    controlleur._clavier.haut = true;
                    break;
                case 'ArrowDown':
                    controlleur._clavier.bas = true;
                    break;
                case 'ArrowLeft' :
                    controlleur._clavier.gauche = true;
                    break;
                case 'ArrowRight':
                    controlleur._clavier.droite = true;
                    break;
                case 'Space':
                    controlleur._modeles.ecran.attaquer();
                    break;
            }
            controlleur._modeles.ecran.bougerPersonnage(
                controlleur._clavier.haut, 
                controlleur._clavier.bas, 
                controlleur._clavier.gauche, 
                controlleur._clavier.droite);
        }
    });
        
    window.addEventListener('keyup', event => {
        switch (event.key) {
            case 'ArrowUp':
                controlleur._clavier.haut = false;
                break;
            case 'ArrowDown':
                controlleur._clavier.bas = false;
                break;
            case 'ArrowLeft' :
                controlleur._clavier.gauche = false;
                break;
            case 'ArrowRight':
                controlleur._clavier.droite = false;
                break;
            case 'Space':
                controlleur._clavier.space = false;
                break;
        }
    });
}