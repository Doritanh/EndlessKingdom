module.exports = function(wss) {
    wss.on('connection', function(ws) {
        ws.on('message', function(o) {
            let objet = JSON.parse(o);
            console.log(objet);
        });
        ws.send('something');
    });
}
