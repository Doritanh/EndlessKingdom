let clicked = "connexion";

//Trigger du bouton Connexion
document.querySelector("#btn_connexion").onclick = function() {
    if(clicked == "inscription") {
        document.querySelector("#btn_connexion").style.borderStyle = "inset";
        document.querySelector("#btn_inscription").style.borderStyle = "outset";
        document.querySelector("#fade").style.opacity = 0;
        document.querySelector("#fenetre").style.height = "280px";
        setTimeout(function() {
            document.querySelector("#inscription").style.display = "none";
            document.querySelector("#connexion").style.display = "inline";
            document.querySelector("#fade").style.opacity = 1;
        }, 400);
        clicked = "connexion";
    }
}

//Triger du bouton Inscription
document.querySelector("#btn_inscription").onclick = function() {
    if(clicked == "connexion") {
        document.querySelector("#btn_inscription").style.borderStyle = "inset";
        document.querySelector("#btn_connexion").style.borderStyle = "outset";
        document.querySelector("#fade").style.opacity = 0;
        document.querySelector("#fenetre").style.height = "410px";
        setTimeout(function() {
            document.querySelector("#connexion").style.display = "none";
            document.querySelector("#inscription").style.display = "inline";
            document.querySelector("#fade").style.opacity = 1;
        }, 400);
        clicked = "inscription";
    }
}

