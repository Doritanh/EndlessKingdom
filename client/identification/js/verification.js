window.Identification.verification = {};

(function() {

    var verifEmail = function() {
        let reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        if(!reg.test(document.querySelector("#adresse").value)){
            document.querySelector("#adresse").style.backgroundColor = "#FE5353";
        }
        else {
            document.querySelector("#adresse").style.backgroundColor = "white";
        }
    };

    Identification.verification.events = function() {
        document.querySelector("#adresse").addEventListener('keyup', verifEmail);
        document.querySelector("#confMdp").addEventListener('keyup', verifConfMdp);
    };
})();