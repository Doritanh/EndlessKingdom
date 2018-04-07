const identification = require('./identification.js');

module.exports = function(wss) {
    wss.on('connection', function(ws) {
        ws.on('message', function(o) {
            let id = JSON.parse(o).id;
            let data = JSON.parse(o).values;
            if (id === 'connexionDemande') {
                identification.connexion(data.pseudo, data.mdp)
                .then(number => {
                    let objet = {
                        'id' : 'connexionReponse',
                        'values' : {
                            'number' : number
                        }
                    };
                    ws.send(JSON.stringify(objet));
                }).catch(function(error) {
                    console.log("ERREUR : ")
                    console.log(error)
                    let objet = {
                        'id' : 'connexionReponse',
                        'values' : {
                            'number' : 0
                        }
                    };
                    ws.send(JSON.stringify(objet));
                });
            } else if (id === 'inscriptionDemande') {
                identification.inscription(data.pseudo, data.mail, data.mdp, data.mdpConfirm)
                .then(number => {
                    let objet = {
                        'id' : 'inscriptionReponse',
                        'values' : {
                            'number' : number
                        }
                    };
                    ws.send(JSON.stringify(objet));
                }).catch(function(error) {
                    console.log("ERREUR : ")
                    console.log(error)
                    let objet = {
                        'id' : 'inscriptionReponse',
                        'values' : {
                            'number' : 0
                        }
                    };
                    ws.send(JSON.stringify(objet));
                });
            }
        });
    });
}
