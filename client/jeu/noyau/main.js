/*
**  Programme principal du jeu
**  Endless Kingdom
**  Antho Charly Lucas Marion
*/
"use strict";
window.EndlessKingdom = {};

// Events du jeu
import {events} from '/client/jeu/noyau/events.js';
// Classes du jeu
import {Ecran} from '/client/jeu/noyau/classes/Ecran.js';
import {Camera} from '/client/jeu/noyau/classes/Camera.js';
import {Clavier} from '/client/jeu/noyau/classes/Clavier.js';
import {Menu} from '/client/jeu/noyau/classes/Menu.js';

// Main du jeu
(function() {
    var ecran, clavier;

    let init = function() {
        ecran = new Ecran(document.querySelector("#ecran"));
        ecran.dimension(800, 600);
        ecran.chargement();
        clavier = new Clavier();
        events.addClavierEvents(clavier);
    };

    let menu = function() {
        let menu = new Menu();
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
