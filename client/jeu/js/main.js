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

// Main du jeu
(function() {
    const socket = new WebSocket('ws://' + window.location.hostname + ':8080');
    const id = sessionStorage.getItem('sessionID');
    console.log(id)
    // Fenetre d'ecran
    const fenetres = {
        ecran : document.querySelector("#ecran"),
        menu : document.querySelector("#menu"),
        creationPerso : document.querySelector('#creationPerso')
    }
    // Touches de clavier
    let clavier = {
        haut : false,
        bas : false,
        gauche : false,
        droite : false
    }

    /**
     * Rends visible une fenetre
     * @param {fenetre} fenetre
     */
    let afficherFenetre = function(fenetre) {
        for (var f in fenetres) {
            fenetres[f].style.display = "none";
        }
        if (fenetre !== "none") {
            fenetres[fenetre].style.display = "block";
        }
    }

    /**
     * Affiche le menu
     * @param {*} content 
     */
    let menu = function(content) {
        console.log("menu : " + content)
        /*
        ** Construction du menu
        */
    }

    /**
     * Fonction pour initialiser la creation de personnages
     */
    let creationPerso = function() {
        let form = fenetres.creationPerso.querySelector('form');
        form.addEventListener('submit', function submit(e) {
            e.preventDefault();
            form.removeEventListener('submit', submit, false);
            let nom = form.querySelector('input[name="nom"]');
            let arrayDifficultes = form.querySelectorAll('input[name="difficulte"]');
            let difficulte;
            arrayDifficultes.forEach(function(item) {
                if (item.checked) difficulte = item;
            });
            socket.send(JSON.stringify({
                'id' : 'creationPerso',
                'values' : {
                    'nom' : nom.value,
                    'difficulte' : difficulte.value
                }
            }));
        }, false);
    }

    let init = function() {
        // Rien d'affiché au début
        afficherFenetre("none");

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
                        case 'NO_PERSONNAGE':
                            creationPerso();
                            afficherFenetre("creationPerso");
                            break;
                        case 'MENU':
                            menu(content);
                            afficherFenetre("menu");
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
