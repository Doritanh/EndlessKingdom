'use strict';

const Sessions = require('./identification/sessions');
const Utilisateur = require('./utilisateur');

module.exports = function(socketServer) {
    // Declaration des sessions ID
    let sessions = new Sessions();

    socketServer.on('connection', function(ws) {
        let utilisateur = new Utilisateur(new Socket(ws), sessions);

        // Reception d'un socket
        ws.on('message', async function(data) {
            let id = JSON.parse(data).id;
            let content = JSON.parse(data).values;

            // Instructions en fonction de l'entete du socket
            if (id === 'connexion') {
                utilisateur.connexion(content.pseudo, content.mdp);
            } else if (id === 'inscription') {
                utilisateur.inscription(content.pseudo, content.mail, content.mdp, content.mdpConfirm);
            } else if (id === 'sessionID') {
                utilisateur.setSessionID(content.id);
            } else if (id === 'status') {
                utilisateur.sendStatus();
            } else if (id === 'creationPerso') {
                utilisateur.creationPersonnage(content.nom, content.difficulte);
            } else if (id === 'creerDonjon') {
                utilisateur.creationDonjon();
            } else if (id === 'lancerDonjon') {
                utilisateur.lancerDonjon(content.niveau, content.personnage);
            }
        });
        /*
        // Le client ferme sa connexion
        ws.on('close', function() {
            //sessionID = 0;
        });*/
    });
}

class Socket {
    constructor(socket) {
        this._socket = socket;
    }

    send(id, values) {
        this._socket.send(JSON.stringify({
            'id' : id,
            'values' : values
        }));
    }
}