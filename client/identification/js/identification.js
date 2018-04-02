Identification.socket = new WebSocket('ws://' + window.location.hostname + ':8080');

(function() {
    let socket = Identification.socket;
    Identification.events = function() {
        // Quand une connexion est effectué
        socket.addEventListener('open', function (e) {
            socket.send({
                'nom' : 'bwah',
                'contenu' : 'rien'
            });
        });
        // Quand un message est reçu du serveur
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
    };
})();
