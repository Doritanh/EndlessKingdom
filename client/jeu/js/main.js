/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
**
**  JavaScript, ECMASCRIPT 6
**  JSDOC 3
*/
"use strict";
window.EndlessKingdom = {};

// Menu
import {VueMenu} from './menu/vueMenu.js';
import {ModeleMenu} from './menu/modeleMenu.js';

// Creation Perso
import {VueCreationPerso} from './menu/vueCreationPerso.js';
import {ModeleCreationPerso} from './menu/modeleCreationPerso.js';

// Main du jeu
(function() {
    const socket = new WebSocket('ws://' + window.location.hostname + ':8080');
    const id = sessionStorage.getItem('sessionID');
    
    const modeles = {
        menu : new ModeleMenu(),
        creationPerso : new ModeleCreationPerso()
    }
    const vues = {
        //erreur : document.querySelector('#erreur'),
        //ecran : document.querySelector("#ecran")
        menu : new VueMenu(modeles.menu),
        creationPerso : new VueCreationPerso(modeles.creationPerso)
    }

    // Touches de clavier
    let clavier = {
        haut : false,
        bas : false,
        gauche : false,
        droite : false
    }

    let clearVues = function() {
        vues.menu.cacher();
        vues.creationPerso.cacher();
    }

    let init = function() {
        // Pas d'id définis, retour au menu
        if (id === null) {
            //window.location.replace('http://' + window.location.hostname + '/');
        }

        // Ecoute des evenements du clavier
        window.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    clavier.haut = true;
                    break;
                case 'ArrowDown':
                    clavier.bas = true;
                    break;
                case 'ArrowLeft' :
                    clavier.gauche = true;
                    break;
                case 'ArrowRight':
                    clavier.droite = true;
                    break;
            }
        });

        window.addEventListener('keyup', event => {
            switch (event.key) {
                case 'ArrowUp':
                    clavier.haut = false;
                    break;
                case 'ArrowDown':
                    clavier.bas = false;
                    break;
                case 'ArrowLeft' :
                    clavier.gauche = false;
                    break;
                case 'ArrowRight':
                    clavier.droite = false;
                    break;
            }
        });

        // Reception d'un socket
        socket.addEventListener('message', e => {
            let id = JSON.parse(e.data).id;
            let content = JSON.parse(e.data).values;

            switch (id) {
                case 'status':
                    switch (content.status) {
                        case 'ERROR':
                            afficherFenetre('erreur');
                            break;
                        case 'NO_PERSONNAGE':
                            creationPerso();
                            afficherFenetre("creationPerso");
                            break;
                        case 'MENU':
                            clearVues();
                            modeles.menu.setPersonnages(content.infos.personnages)
                            modeles.menu.setDonjons(content.infos.donjons);
                            vues.menu.afficher();
                            break;
                        case 'DONJON':
                            break;
                    }
                    break;
            }
        });

        // Ouverture de la connexion au serveur de socket
        socket.addEventListener('open', e => {
            // Envoie de l'id de session
            socket.send(JSON.stringify({
                'id' : 'sessionID',
                'values' : {
                    'id' : id
                }
            }));

            // Requete du status
            socket.send(JSON.stringify({
                'id' : 'status',
                'values' : {}
            }));
        });

        // Petit message sympa
        console.log("EndlessKingdom v0.0.1");
    };

    EndlessKingdom.init = init;
})();

// Event trigger quand load
window.addEventListener('load', () => {
    EndlessKingdom.init();
});
