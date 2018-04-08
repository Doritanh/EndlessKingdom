"use strict";

window.EndlessKingdom =  {};
window.EndlessKingdom.identification = {};

/*
 *  Partie Design
 */
window.EndlessKingdom.identification.design = {};

(function() {
    let clicked = "connexion";
    let tailleFenetreConnexion = "280px";
    let tailleFenetreInscription = "410px";

    var btnConnexion = function() {
        if(clicked == "inscription") {
            document.querySelector("#btn_connexion").style.borderStyle = "inset";
            document.querySelector("#btn_inscription").style.borderStyle = "outset";
            document.querySelector("#fade").style.opacity = 0;
            document.querySelector("#fenetre").style.height = tailleFenetreConnexion;
            setTimeout(function() {
                document.querySelector("#inscription").style.display = "none";
                document.querySelector("#connexion").style.display = "inline";
                document.querySelector("#fade").style.opacity = 1;
            }, 400);
            clicked = "connexion";
        }
    };
    var btnInscription = function() {
        if(clicked == "connexion") {
            document.querySelector("#btn_inscription").style.borderStyle = "inset";
            document.querySelector("#btn_connexion").style.borderStyle = "outset";
            document.querySelector("#fade").style.opacity = 0;
            document.querySelector("#fenetre").style.height = tailleFenetreInscription;
            setTimeout(function() {
                document.querySelector("#connexion").style.display = "none";
                document.querySelector("#inscription").style.display = "inline";
                document.querySelector("#fade").style.opacity = 1;
            }, 400);
            clicked = "inscription";
        }
    };

    EndlessKingdom.identification.design = function() {
        //Trigger du bouton Connexion
        document.querySelector("#btn_connexion").addEventListener('click', btnConnexion);
        //Triger du bouton Inscription
        document.querySelector("#btn_inscription").addEventListener('click', btnInscription);
    };

})();

/*
 *  Partie verification
 */
window.EndlessKingdom.identification.verification = {};

(function() {
    var verifEmail = function() {
        let reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        if(!reg.test(document.querySelector("#adresse").value))
            document.querySelector("#adresse").style.backgroundColor = "#FE5353";
        else
            document.querySelector("#adresse").style.backgroundColor = "white";
    };
    var verifMdp = function() {
        let reg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^.{6,15}$'); //Verifie si il y a au moins une majuscule, une minuscule, un chiffre et entre 6 et 15 caractères

        if (!reg.test(document.querySelector("#mdp").value)) {
            document.querySelector("#mdp").style.backgroundColor = "#FE5353";
        } else {
            document.querySelector("#mdp").style.backgroundColor = "white";
        }
        verifConfMdp();
    };
    var verifConfMdp = function() {
        if(document.querySelector("#confMdp").value != document.querySelector("#mdp").value)
            document.querySelector("#confMdp").style.backgroundColor = "#FE5353";
        else
            document.querySelector("#confMdp").style.backgroundColor = "white";
    };
    EndlessKingdom.identification.verification = function() {
        //Verification email
        document.querySelector("#adresse").addEventListener('keydown', verifEmail);
        document.querySelector("#adresse").addEventListener('keyup', verifEmail);

        //Verification fiabilité mot de passe
        document.querySelector("#mdp").addEventListener('keyup', verifMdp);
        document.querySelector("#mdp").addEventListener('keydown', verifMdp);

        //Verification concordance des mots de passe
        document.querySelector("#confMdp").addEventListener('blur', verifConfMdp);
        document.querySelector("#confMdp").addEventListener('keydown', verifConfMdp);
        document.querySelector("#confMdp").addEventListener('keyup', verifConfMdp);
        document.querySelector("#confMdp").addEventListener('focus', verifConfMdp);
    };
})();

/*
 *  Partie identification
 */
window.EndlessKingdom.identification.socket = new WebSocket('ws://' + window.location.hostname + ':8080');

(function() {
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
            s.send(JSON.stringify(objet));
        });
        document.querySelector('#frm_inscription').addEventListener('submit', function(e) {
            e.preventDefault();
            let objet = {
                'id' : 'inscriptionDemande',
                'values' : {
                    'pseudo' : document.querySelector('#pseudo').value,
                    'mail' : document.querySelector("#adresse").value,
                    'mdp' : document.querySelector("#mdp").value,
                    'mdpConfirm' : document.querySelector("#confMdp").value
                }
            };
            s.send(JSON.stringify(objet));
        });
    };
    var receiveSocket = function(data) {
        let id = JSON.parse(data).id;
        let content = JSON.parse(data).values;
        let message = document.querySelector('#message');
        if (id === 'connexionReponse') {
            switch(content.number) {
                case 0:
                    message.textContent = 'Problème serveur.';
                    break;
                case 1:
                    document.querySelector('#frm_connexion').submit();
                    break;
                case 2:
                    message.textContent = 'Votre compte n\' as pas été trouvé';
                    break;
                case 3:
                    message.textContent = 'Ce mot de passe ne correspond pas à ce compte.';
                    break;
                default:
                    message.textContent = 'Message non géré.';
            }
        } else if (id === 'inscriptionReponse') {
            switch(content.number) {
                case 0:
                    message.textContent = 'Problème serveur';
                    break;
                case 1:
                    message.textContent = 'Inscription effectué !'
                    break;
                case 2:
                    message.textContent = 'Les mots de passes ne correspondent pas.';
                    break;
                case 3:
                    message.textContent = 'Ce pseudo existe déjà.';
                    break;
                case 4:
                    message.textContent = 'Ce mail existe déjà.';
                    break;
                case 5:
                    message.textContent = 'Problème à l\'inscription';
                    break;
                default:
                    message.textContent = 'Message non géré.';
            }
        }
    };

    let socket = EndlessKingdom.identification.socket;
    EndlessKingdom.identification.websocket = function() {
        // Quand une connexion est effectué
        socket.addEventListener('open', function (e) {
            submitEvents(socket);
        });
        // Quand un message est reçu du serveur
        socket.addEventListener('message', function (e) {
            receiveSocket(e.data);
        });
    };
})();

/*
 *  Page chargé
 */
window.addEventListener('load', function() {
    EndlessKingdom.identification.design();
    EndlessKingdom.identification.verification();
    EndlessKingdom.identification.websocket();
});
