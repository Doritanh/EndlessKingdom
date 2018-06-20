'use strict';

const Sessions = require('./sessions');
const Jeu = require('./jeu/jeu');
const identification = require('./identification/identification.js');

module.exports = function(wss) {
    // Declaration des sessions ID
    let sessions = new Sessions();

    wss.on('connection', function(ws) {
        let socket = new Socket(ws);
        let sessionID = 0;
        let jeu = new Jeu();

        // Reception d'un socket
        ws.on('message', async function(data) {
            let id = JSON.parse(data).id;
            let content = JSON.parse(data).values;

            // Instructions en fonction de l'entete du socket
            if (id === 'connexion') {
                let number = await connexion(ws, content.pseudo, content.mdp);
                if (number === 1) sessionID = sessions.ajouter(content.pseudo);
                socket.send('connexion', {'number' : number, 'sessionID' : sessionID});
            } else if (id === 'inscription') {
                let number = await inscription(ws, content.pseudo, content.mail, content.mdp, 
                    content.mdpConfirm);
                socket.send('inscription', {'number': number});
            } else if (id === 'sessionID') {
                sessionID = content.id;
                jeu.setPseudo(sessions.get(sessionID));
            } else if (id === 'status') {
                let status = await jeu.getStatus();
                switch (status) {
                    case 'MENU':
                        let menu = await jeu.getInfosMenu();
                        socket.send('status', {
                            'status' : status,
                            'contenu' : menu
                        });
                        break;
                    default:
                        socket.send('status', {'status' : status});
                        break;
                }
            } else if (id === 'creationPerso') {
                await jeu.ajouterPerso(content.nom, content.difficulte);
                let status = await jeu.getStatus();
                socket.send('status', {'status' : status});
            } else if (id === 'creerDonjon') {
                let contenu = await jeu.ajouterDonjon();
                socket.send('status', {'status' : 'DONJON', 'contenu' : contenu});
            } else if (id === 'lancerDonjon') {
                socket.send('status', {'status' : 'DONJON'});
            }
        });

        // Le client ferme sa connexion
        ws.on('close', function() {
            sessionID = 0;
        });
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

let connexion = async function(ws, pseudo, mdp) {
    let number = 0;
    try {
        number = await identification.connexion(pseudo, mdp);
    } catch (error) {
        console.log(error);
    }
    return number;
}

let inscription = async function(ws, pseudo, mail, mdp, mdpConfirm) {
    let number = 0;
    try {
        number = await identification.inscription(pseudo, mail, mdp, mdpConfirm);
    } catch(error) {
        console.log(error);
    }
    return number;
}
