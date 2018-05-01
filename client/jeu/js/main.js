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
    const context = document.querySelector("#ecran").getContext('2d');
    const menu = document.querySelector("#menu")
    // Touches de clavier
    let clavier = {
        haut : false,
        bas : false,
        gauche : false,
        droite : false
    }

    let construireMenu = function(content) {
        console.log("menu : " + content)
        /*
        ** Construction du menu
        */
       menu.style.display = "block";
    }

    let init = function() {
        // RIen d'affiché au début
        context.canvas.style.display = "none";
        menu.style.display = "none";

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
                            break;
                        case 'MENU':
                            construireMenu(content);
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
