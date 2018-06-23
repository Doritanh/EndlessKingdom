"use strict";

window.EndlessKingdom =  {};
window.EndlessKingdom.identification = {};

(function() {
    /*
    ** Messages
    */
    let afficherMessage = function(message) {
        let balise = document.querySelector("#message");
        balise.textContent = message;
        balise.style.display = 'block';
    }

    let supprimerMessage = function() {
        document.querySelector("#message").style.display = 'none';
    }

    /*
    **  Partie Design
    */
    let changerBoutton = function(bouton) {
        if(bouton == "connexion") {
            document.querySelector("#btn_connexion").style.backgroundColor = "rgb(151, 160, 175)";
            document.querySelector("#btn_inscription").style.backgroundColor = "rgb(236,236,236)";
            document.querySelector("#fade").style.opacity = 0;
            supprimerMessage();
            setTimeout(function() {
                document.querySelector("#inscription").style.display = "none";
                document.querySelector("#connexion").style.display = "block";
                document.querySelector("#fade").style.opacity = 1;
            }, 400);
        } else {
            document.querySelector("#btn_inscription").style.backgroundColor = "rgb(151, 160, 175)";
            document.querySelector("#btn_connexion").style.backgroundColor = "rgb(236,236,236)";
            document.querySelector("#fade").style.opacity = 0;
            supprimerMessage();
            setTimeout(function() {
                document.querySelector("#connexion").style.display = "none";
                document.querySelector("#inscription").style.display = "block";
                document.querySelector("#fade").style.opacity = 1;
            }, 400);
        }
    }

    /*
    **  Partie verification
    */
   var verifPseudo = function() {
       let pseudo = document.querySelector('#pseudo');
       if (pseudo.value === '') {
           pseudo.style.backgroundColor = "#FE5353";
           afficherMessage('Le pseudo est vide');
       } else {
            pseudo.style.backgroundColor = 'white';
           supprimerMessage();
       }
   }
    var verifEmail = function() {
        let reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        if(!reg.test(document.querySelector("#adresse").value)) {
            document.querySelector("#adresse").style.backgroundColor = "#FE5353";
            afficherMessage('Votre adresse mail n\'est pas valide.');
        } else {
            document.querySelector("#adresse").style.backgroundColor = "white";
            supprimerMessage();
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
            supprimerMessage();
        }
    };
    var verifConfMdp = function() {
        if(document.querySelector("#confMdp").value != document.querySelector("#mdp").value) {
            document.querySelector("#confMdp").style.backgroundColor = "#FE5353";
            afficherMessage('Les mots de passes ne correspondent pas.');
        }
        else {
            document.querySelector("#confMdp").style.backgroundColor = "white";
            supprimerMessage();
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
        document.querySelector("#btn_connexion").addEventListener('click', function() { changerBoutton('connexion'); });
        document.querySelector("#btn_inscription").addEventListener('click', function() { changerBoutton('inscription'); });

        //Verification pseudo
        document.querySelector('#pseudo').addEventListener('keydown', verifPseudo);
        document.querySelector('#pseudo').addEventListener('keyup', verifPseudo);

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
