/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/
"use strict";
window.EndlessKingdom = {};

import {Ecran} from '/client/jeu/noyau/classes/Ecran.js';
import {Camera} from '/client/jeu/noyau/classes/Camera.js';

// Main du jeu
(function() {
    var ecran;
    var camera;

    let init = function() {
        ecran = new Ecran(document.querySelector("#ecran"));
        ecran.dimension(800, 600);
        ecran.chargement();
        camera = new Camera(ecran);
    };

    let lancer = function() {
        init();
        console.log("EndlessKingdom v0.0.1");
    };

    EndlessKingdom.lancer = lancer;
})();

// Event trigger quand load
window.addEventListener('load', function() {
    EndlessKingdom.lancer();
});
