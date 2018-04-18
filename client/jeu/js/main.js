/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/
"use strict";
window.EndlessKingdom = {};

// Main du jeu
(function() {
    const socket = new WebSocket('ws://' + window.location.hostname + '/jeu/:8080');
    console.log(window.location.hostname)
    var context, div;

    // Affichage du menu principal
    let menuPrincipal = function() {
        let btnDonjonSuivant = document.createElement('button');
        let btnDonjonSuivantText = document.createTextNode('Donjon Suivant');
        btnDonjonSuivant.appendChild(btnDonjonSuivantText);
    
        btnDonjonSuivant.addEventListener('click', function(e) {
            div.parentNode.removeChild(div);
            lancerDonjon();
        }, false);
        
        div.appendChild(btnDonjonSuivant);
    
        div.style.position = 'absolute';
        document.body.appendChild(div);
    };

    let lancerDonjon = function() {

    };

    let init = function() {
        // Partie pour dessiner les scenes
        context = document.querySelector("#ecran").getContext('2d');
        // Partie pour dessiner l'interface
        div = document.createElement('div');

        // sockets
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

        // lancer le menu
        menuPrincipal();
        console.log("EndlessKingdom v0.0.1");
    };

    EndlessKingdom.lancer = init;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    EndlessKingdom.lancer();
});
