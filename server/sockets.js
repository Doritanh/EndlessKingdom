'use strict';

const Sessions = require('./sessions');
const identification = require('./identification/identification.js');

module.exports = function(wss) {
    // Declaration des sessions ID
    let sessions = new Sessions();

    wss.on('connection', function(ws) {
        let sessionID = 0;

        // Reception d'un socket
        ws.on('message', async function(data) {
            let id = JSON.parse(data).id;
            let content = JSON.parse(data).values;
            let number = 0;

            // Instructions en fonction de l'entete du socket
            switch (id) {
                case 'connexion':
                    number = await connexion(ws, content.pseudo, content.mdp);
                    if (number === 1) sessionID = sessions.ajouter(content.pseudo);
                    console.log("envoie : " + sessionID)
                    sendSocket(ws, 'connexion', {'number' : number, 'sessionID' : sessionID});
                    break;
                case 'inscription':
                    number = await inscription(ws, content.pseudo, content.mail, content.mdp, content.mdpConfirm);
                    sendSocket(ws, 'inscription', {'number': number});
                    break;
                case 'sessionID':
                    sessionID = content.id;
                    break;
            }
        });

        // Le client ferme sa connexion
        /*ws.on('close', function() {

        });*/
    });
}

let sendSocket = function(ws, id, values) {
    ws.send(JSON.stringify({
        'id' : id,
        'values' : values
    }));
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
