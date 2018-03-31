/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/

"use strict"
window.Jeu = {};

// Main du jeu
(function() {
    let init = function() {
        window.Jeu.ecran = new Ecran(document.querySelector("#canvas"));
    }

    let lancer = function() {
        console.log("lancer !");
    };

    window.Jeu.lancer = lancer;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    Jeu.lancer();
});
