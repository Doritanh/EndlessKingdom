module.exports = function(wss) {
    wss.on('connection', function(ws) {
        ws.on('message', function(o) {
            let objet = JSON.parse(o);
            switch (objet.id) {
                case 'connexionDemande':
                    ws.send('connexion')
                    break;
                case 'inscriptionDemande':
                    ws.send('inscription')
                    break;
                default:
                    ws.send('default')
                    break;
            }
        });
    });
}
