const identification = require('./identification.js');

module.exports = function(wss) {
    wss.on('connection', function(ws) {
        ws.on('message', function(o) {
            let objet = JSON.parse(o);
            if (objet.id === 'connexionDemande') {
                identification.connexion(objet.values).then(n => {
                    ws.send(n);
                }).catch(function(error) {
                    console.log(error);
                });
            } else if (objet.id === 'inscriptionDemande') {
                ws.send('inscription')
            }
        });
    });
}
