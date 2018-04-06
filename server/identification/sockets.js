const identification = require('./identification.js');

module.exports = function(wss) {
    wss.on('connection', function(ws) {
        ws.on('message', function(o) {
            let id = JSON.parse(o).id;
            let data = JSON.parse(o).values;
            if (id === 'connexionDemande') {
                identification.connexion(data.pseudo, data.mdp).then(number => {
                    ws.send(number);
                }).catch(function(error) {
                    console.log("ERREUR : ")
                    console.log(error)
                    ws.send(0);
                });
            } else if (id === 'inscriptionDemande') {
                identification.inscription(data.pseudo, data.mail, data.mdp, data.mdpConfirm).then(n => {
                    ws.send(n);
                }).catch(function(error) {
                    console.log("ERREUR : ")
                    console.log(error)
                });
            }
        });
    });
}
