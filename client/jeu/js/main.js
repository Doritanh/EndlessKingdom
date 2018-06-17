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
    // Fenetre d'ecran
    const fenetres = {
        erreur : document.querySelector('#erreur'),
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
     * @param {object} content
     */
    let menu = function(content) {
        //  Partie affichage des personnages
        let personnageSelected = 0;
        let champPersonnage = document.querySelector("#selectionPerso span");
        champPersonnage.textContent = content.personnages[personnageSelected].nom;

        // Constantes
        const choixDonjon = document.querySelector('#choixDonjon');
        const listeDonjons = document.querySelector("#choixDonjon table");

        /**
         * Ajoute un donjon au menu
         * @param {String} nom 
         * @param {String} niveau 
         * @param {String} mode
         */
        let addDonjon = function(nom, niveau, mode) {
            let trDonjon = document.createElement("tr");

            let tdNom = document.createElement('td');
            let nomDonjon = document.createTextNode(nom);
            tdNom.appendChild(nomDonjon);
            trDonjon.appendChild(tdNom);

            let tdNiveau = document.createElement('td');
            let niveauDonjon = document.createTextNode(niveau);
            tdNiveau.appendChild(niveauDonjon);
            trDonjon.appendChild(tdNiveau);

            let tdMode = document.createElement('td');
            let modeDonjon = document.createTextNode(mode);
            let btnMode = document.createElement('button');
            btnMode.appendChild(modeDonjon);
            tdMode.appendChild(btnMode);
            trDonjon.appendChild(tdMode);

            listeDonjons.appendChild(trDonjon);
        }

        // Ajout des donjons
        if (content.donjons.length !== 0) {
            // On ajoute l'entete du tableau puis on y met les donjons
            let trDonjon = document.createElement("tr");

            let thNom = document.createElement('th');
            thNom.appendChild(document.createTextNode("Nom"));
            trDonjon.appendChild(thNom);

            let thNiveau = document.createElement('th');
            thNiveau.appendChild(document.createTextNode("Niveau"));
            trDonjon.appendChild(thNiveau);

            let thMode = document.createElement('th');
            thMode.appendChild(document.createTextNode("Mode"));
            trDonjon.appendChild(thMode);

            listeDonjons.appendChild(trDonjon);
            for (var i=0; i<content.donjons.length; i++) {
                addDonjon(content.donjons[i].nom, content.donjons[i].niveau, content.donjons[i].mode);
            }
        } else {
            // Si il n'y as pas de donjons
            let creerButton = document.createElement('button');
            let boutonNode = document.createTextNode('Création du premier donjon');
            creerButton.appendChild(boutonNode);
            choixDonjon.appendChild(creerButton);
        }
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
        // Pas d'id définis, retour au menu
        if (id === null) {
            //window.location.replace('http://' + window.location.hostname + '/');
        }
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
                        case 'ERROR':
                            afficherFenetre('erreur');
                            break;
                        case 'NO_PERSONNAGE':
                            creationPerso();
                            afficherFenetre("creationPerso");
                            break;
                        case 'MENU':
                            menu(content.infos);
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
