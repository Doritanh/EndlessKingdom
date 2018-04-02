window.Identification = {};
window.Identification.clicked = "connexion";

window.Identification.btnConnexion = function() {
    if(Identification.clicked == "inscription") {
        document.querySelector("#btn_connexion").style.borderStyle = "inset";
        document.querySelector("#btn_inscription").style.borderStyle = "outset";
        document.querySelector("#fade").style.opacity = 0;
        document.querySelector("#fenetre").style.height = "280px";
        setTimeout(function() {
            document.querySelector("#inscription").style.display = "none";
            document.querySelector("#connexion").style.display = "inline";
            document.querySelector("#fade").style.opacity = 1;
        }, 400);
        Identification.clicked = "connexion";
    }
};

window.Identification.btnInscription = function() {
    if(Identification.clicked == "connexion") {
        document.querySelector("#btn_inscription").style.borderStyle = "inset";
        document.querySelector("#btn_connexion").style.borderStyle = "outset";
        document.querySelector("#fade").style.opacity = 0;
        document.querySelector("#fenetre").style.height = "410px";
        setTimeout(function() {
            document.querySelector("#connexion").style.display = "none";
            document.querySelector("#inscription").style.display = "inline";
            document.querySelector("#fade").style.opacity = 1;
        }, 400);
        Identification.clicked = "inscription";
    }
};

window.addEventListener('load', function() {
    let btnConnexion = document.querySelector("#btn_connexion");
    let btnInscription = document.querySelector("#btn_inscription");

    //Trigger du bouton Connexion
    btnConnexion.addEventListener('click', Identification.btnConnexion);
    //Triger du bouton Inscription
    btnInscription.addEventListener('click', Identification.btnInscription);
});
