/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/

"use strict";
window.EndlessKingdom = {};

// Main du jeu
(function() {
    var ecran;
    var camera;

    let init = function() {
        ecran = new Ecran(document.querySelector("#ecran"));
        ecran.dimension(800, 600);
        camera = new Camera(ecran);
    }

    let lancer = function() {
        init();
        console.log("lancer !");
    };

    EndlessKingdom.lancer = lancer;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    EndlessKingdom.lancer();
});
