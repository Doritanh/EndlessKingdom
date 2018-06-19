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

import { Controlleur } from './controlleur.js'; 

// Main du jeu
(function() {
    const socket = new WebSocket('ws://' + window.location.hostname + ':8080');
    const id = sessionStorage.getItem('sessionID');
    const controlleur = new Controlleur();

    let init = function() {
        // Pas d'id définis, retour au menu
        if (id === null) {
           // window.location.replace('http://' + window.location.hostname + '/');
        }

        // Reception d'un socket
        socket.addEventListener('message', e => {
            let id = JSON.parse(e.data).id;
            let content = JSON.parse(e.data).values;

            switch (id) {
                case 'status':
                    switch (content.status) {
                        case 'ERROR':
                            controlleur.afficher('erreur');
                            break;
                        case 'NO_PERSONNAGE':
                            controlleur.afficher('creationPerso');
                            break;
                        case 'MENU':
                            controlleur.menu.modele.setPersonnage(content.infos.personages);
                            controlleur.menu.modele.setDonjons(content.infos.donjons);
                            controlleur.afficher('menu');
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
