Identification.socket = new WebSocket('ws://' + window.location.hostname + ':8080');

(function() {
    let socket = Identification.socket;
    let objet = {'nom' : 'bwah', 'contenu' : 'rien'};

    var submitEvents = function(s) {
        document.querySelector('#frm_connexion').addEventListener('submit', function(e) {
            e.preventDefault();
            let objet = {
                'id' : 'connexionDemande',
                'values' : {
                    'pseudo' : document.querySelector('#Cpseudo').value,
                    'mdp' : document.querySelector('#Cmdp').value
                }
            };
            socket.send(JSON.stringify(objet));
        });

        document.querySelector('#frm_inscription').addEventListener('submit', function(e) {
            e.preventDefault();
            let objet = {
                'id' : 'inscriptionDemande',
                'values' : {
                    'pseudo' : document.querySelector('#pseudo').value,
                    'adresse' : document.querySelector("#adresse").value,
                    'mdp' : document.querySelector("#mdp").value,
                    'mdpConfirm' : document.querySelector("#confMdp").value
                }
            };
            socket.send(JSON.stringify(objet));
        });
    };

    Identification.events = function() {
        // Quand une connexion est effectué
        socket.addEventListener('open', function (e) {
            submitEvents(socket);
        });
        // Quand un message est reçu du serveur
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
    };
})();
