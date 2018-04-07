'use strict';

const identification = require('./identification.js');

module.exports = function(wss) {
    // Quand il y une nouvelle connexion au serveur de socket
    wss.on('connection', function(ws) {
        // Quand un socket arrive, on recupere data
        ws.on('message', function(data) {
            // On sépare le data
            let id = JSON.parse(data).id;
            let content = JSON.parse(data).values;
            // Instructions en fonction de l'entete du socket
            if (id === 'connexionDemande') {
                connexionDemande(ws, content.pseudo, content.mdp);
            } else if (id === 'inscriptionDemande') {
                inscriptionDemande(ws, content.pseudo, content.mail, content.mdp, content.mdpConfirm);
            }
        });
    });
}

let connexionDemande = async function(ws, pseudo, mdp) {
    let number = 0;
    try {
        number = await identification.connexion(pseudo, mdp);
    } catch (e) {
        console.log(error);
    }
    ws.send(JSON.stringify({
        'id' : 'connexionReponse',
        'values' : {
            'number' : number
        }
    }));
}

let inscriptionDemande = async function(ws, pseudo, mail, mdp, mdpConfirm) {
    let number = 0;
    try {
        number = await identification.inscription(pseudo, mail, mdp, mdpConfirm);
    } catch(error) {
        console.log(error);
    }
    ws.send(JSON.stringify({
        'id' : 'inscriptionReponse',
        'values' : {
            'number' : number
        }
    }));
}
