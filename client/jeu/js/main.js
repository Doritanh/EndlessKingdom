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
    const context = document.querySelector("#ecran").getContext('2d');
    const menu = document.querySelector("#menu");
    const id = sessionStorage.getItem('sessionID');

    let lancer = function() {
        socket.addEventListener('open', function (e) {
            socket.send(JSON.stringify({
                'id' : 'sessionID',
                'values' : {
                    'id' : id
                }
            }));
        });

        // lancer le menu
        console.log("EndlessKingdom v0.0.1");
    };

    EndlessKingdom.lancer = lancer;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    EndlessKingdom.lancer();
});
