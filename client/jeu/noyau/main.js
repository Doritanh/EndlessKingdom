/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/

"use strict";
window.EndlessKingdom = {};

// Main du jeu
(function() {
    var ecran = new Ecran();
    var camera = new Camera();

    let init = function() {
        ecran.canvas(document.querySelector("#ecran"));
        ecran.dimension(800, 600);
        ecran.chargement();
        camera = new Camera(ecran);
    }

    let lancer = function() {
        init();
        setTimeout(function() {
            ecran.clear();
        }, 3000);
        console.log("EndlessKingdom v0.0.1");
    };

    EndlessKingdom.lancer = lancer;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    EndlessKingdom.lancer();
});
