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

    let construireMenu = function(content) {
        console.log("menu : " + content)
        /*
        ** Construction du menu
        */
       menu.style.display = "block";
    }

    let init = function() {
        context.canvas.style.display = "none";
        menu.style.display = "none";

        socket.addEventListener('message', function(e) {
            let id = JSON.parse(e.data).id;
            let content = JSON.parse(e.data).values;

            switch (id) {
                case 'infosMenu':
                    construireMenu(content);
                    break;
            }
        });

        socket.addEventListener('open', function (e) {
            // Envoie de l'id de session
            socket.send(JSON.stringify({
                'id' : 'sessionID',
                'values' : {
                    'id' : id
                }
            }));

            socket.send(JSON.stringify({
                'id' : 'infosMenu',
                'values' : {}
            }));
        });

        // lancer le menu
        console.log("EndlessKingdom v0.0.1");
    };

    EndlessKingdom.init = init;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    EndlessKingdom.init();
});
