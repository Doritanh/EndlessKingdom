module.exports = function(wss) {
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(objet) {
            console.log(objet);
        });
        ws.send('something');
    });
}
