"use strict";

window.EndlessKingdom =  {};
window.EndlessKingdom.identification = {};

(function() {
    /*
    **
    */
    let afficherMessage = function(message) {
        let balise = document.querySelector("#message");
        balise.textContent = message;
        balise.style.display = 'block';
    }

    /*
    **  Partie Design
    */
    let clicked = "connexion";
    let tailleFenetreConnexion = "280px";
    let tailleFenetreInscription = "430px";
    var btnConnexion = function() {
        if(clicked == "inscription") {
            document.querySelector("#btn_connexion").style.borderStyle = "inset";
            document.querySelector("#btn_inscription").style.borderStyle = "outset";
            document.querySelector("#fade").style.opacity = 0;
            document.querySelector("#fenetre").style.height = tailleFenetreConnexion;
            document.querySelector("#message").textContent = '';
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

    /*
    **  Partie verification
    */
    var verifEmail = function() {
        let reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        if(!reg.test(document.querySelector("#adresse").value)) {
            document.querySelector("#adresse").style.backgroundColor = "#FE5353";
            afficherMessage('Votre adresse mail n\'est pas valide.');
        } else {
            document.querySelector("#adresse").style.backgroundColor = "white";
        }
    };
    var verifMdp = function() {
        //Verifie si il y a au moins une majuscule, une minuscule, un chiffre et entre 6 et 15 caractères
        let reg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^.{6,15}$'); 

        if (!reg.test(document.querySelector("#mdp").value)) {
            document.querySelector("#mdp").style.backgroundColor = "#FE5353";
            afficherMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.');

        } else {
            document.querySelector("#mdp").style.backgroundColor = "white";
        }
        verifConfMdp();
    };
    var verifConfMdp = function() {
        if(document.querySelector("#confMdp").value != document.querySelector("#mdp").value) {
            document.querySelector("#confMdp").style.backgroundColor = "#FE5353";
            afficherMessage('Les mots de passes ne correspondent pas.');
        }
        else {
            document.querySelector("#confMdp").style.backgroundColor = "white";
        }
    };

    /*
    **  Partie identification
    */
    var submitEvents = function(s) {
        document.querySelector('#frm_connexion').addEventListener('submit', function(e) {
            e.preventDefault();
            let objet = {
                'id' : 'connexion',
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
                'id' : 'inscription',
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
        if (id === 'connexion') {
            switch(content.number) {
                case 0:
                    afficherMessage('Problème serveur.');
                    break;
                case 1:
                    sessionStorage.setItem('sessionID', content.sessionID);
                    window.location.replace('http://' + window.location.hostname + '/jeu/');
                    break;
                case 2:
                    afficherMessage('Votre compte n\' as pas été trouvé');
                    break;
                case 3:
                    afficherMessage('Ce mot de passe ne correspond pas à ce compte.');
                    break;
                default:
                    afficherMessage('Message non géré.');
            }
        } else if (id === 'inscription') {
            switch(content.number) {
                case 0:
                    afficherMessage('Problème serveur');
                    break;
                case 1:
                    afficherMessage('Inscription effectuée ! Veuillez vous connecter.');
                    break;
                case 2:
                    afficherMessage('Les mots de passes ne correspondent pas.');
                    break;
                case 3:
                    afficherMessage('Ce pseudo existe déjà.');
                    break;
                case 4:
                    afficherMessage('Ce mail est déjà utilisé.');
                    break;
                case 5:
                    afficherMessage('Votre inscription n\'a pas fonctionné. Veuillez réessayer ultérieurement.');
                    break;
                default:
                    afficherMessage('Message non géré.');
            }
        }
    };

    let init = function() {
        // Trigger des boutons
        document.querySelector("#btn_connexion").addEventListener('click', btnConnexion);
        document.querySelector("#btn_inscription").addEventListener('click', btnInscription);

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

        const socket = new WebSocket('ws://' + window.location.hostname + ':8080');
        // Quand une connexion est effectué
        socket.addEventListener('open', function (e) {
            submitEvents(socket);
        });
        // Quand un message est reçu du serveur
        socket.addEventListener('message', function (e) {
            receiveSocket(e.data);
        });
    }

    EndlessKingdom.identification.init = init();

})();

/*
 *  Page chargé
 */
window.addEventListener('load', function() {
    EndlessKingdom.identification.init;
});
