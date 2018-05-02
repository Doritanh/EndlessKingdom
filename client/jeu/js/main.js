/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/
"use strict";
window.EndlessKingdom = {};

// Main du jeu
(function() {
    const socket = new WebSocket('ws://' + window.location.hostname + ':8080');
    const id = sessionStorage.getItem('sessionID');
    // Fenetre d'ecran
    const fenetre = {
        ecran : document.querySelector("#ecran"),
        menu : document.querySelector("#menu"),
        creationPerso : document.querySelector('#creationPerso')
    }
    const fenetreActive = null;
    // Touches de clavier
    let clavier = {
        haut : false,
        bas : false,
        gauche : false,
        droite : false
    }

    let activerFenetre = function(fenetreActive) {
        for(var f in fenetre) {
            fenetre[f].style.display = "none";
        }
        if (fenetreActive !== "none") {
            fenetre[fenetreActive].style.display = "block";
        }
    }

    let afficherMenu = function(content) {
        console.log("menu : " + content)
        /*
        ** Construction du menu
        */
       activerFenetre("menu")
    }

    let afficherCreationPerso = function() {
        activerFenetre("creationPerso");
    }

    let init = function() {
        // Rien d'affiché au début
        activerFenetre("none");

        // Ecoute des evenements du clavier
        window.addEventListener('keydown', function(e) {
            switch (e.key) {
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

        window.addEventListener('keyup', function(e) {
            switch (e.key) {
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
        socket.addEventListener('message', function(e) {
            let id = JSON.parse(e.data).id;
            let content = JSON.parse(e.data).values;

            switch (id) {
                case 'status':
                    switch (content.status) {
                        case 'NO_PERSONNAGE':
                            afficherCreationPerso();
                            break;
                        case 'MENU':
                            afficherMenu(content);
                            break;
                        case 'DONJON':
                            break;
                    }
                    break;
            }
        });

        // Ouverture de la connexion au serveur de socket
        socket.addEventListener('open', function (e) {
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
window.addEventListener('load', function() {
    EndlessKingdom.init();
});
