window.Identification.verification = {};

(function() {

    var verifEmail = function() {
        let reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        if(!reg.test(document.querySelector("#adresse").value))
            document.querySelector("#adresse").style.backgroundColor = "#FE5353";
        else 
            document.querySelector("#adresse").style.backgroundColor = "white";
    };

    var verifConfMdp = function() {
        if(document.querySelector("#confMdp").value != document.querySelector("#mdp").value)
            document.querySelector("#confMdp").style.backgroundColor = "#FE5353";
        else
            document.querySelector("#confMdp").style.backgroundColor = "white";
    };

    var verifMdp = function() {
        let reg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^.{6,15}$'); //Verifie si il y a au moins une majuscule, une minuscule, un chiffre et entre 6 et 15 caractères

        if (!reg.test(document.querySelector("#mdp").value)) {
            document.querySelector("#mdp").style.backgroundColor = "#FE5353";
        } else {
            document.querySelector("#mdp").style.backgroundColor = "white";
        }
    };

    Identification.verification.events = function() {
        //Verification email
        document.querySelector("#adresse").addEventListener('keyup', verifEmail);

        //Verification fiabilité mot de passe
        document.querySelector("#mdp").addEventListener('keyup', verifMdp);

        //Verification concordance des mots de passe
        document.querySelector("#confMdp").addEventListener('blur', verifConfMdp);
        document.querySelector("#confMdp").addEventListener('focus', verifConfMdp);
    };
})();