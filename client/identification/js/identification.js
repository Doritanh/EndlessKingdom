let clicked = "connexion";

document.querySelector("#btn_connexion").onclick = function() {
    if(clicked == "inscription") {
        document.querySelector("#btn_connexion").style.borderStyle = "inset";
        document.querySelector("#btn_inscription").style.borderStyle = "outset";
        document.querySelector("#connexion").style.display = "inline";
        document.querySelector("#inscription").style.display = "none";
        document.querySelector("#fenetre").style.height = "280px";
        clicked = "connexion";
    }
}

document.querySelector("#btn_inscription").onclick = function() {
    if(clicked == "connexion") {
        document.querySelector("#btn_inscription").style.borderStyle = "inset";
        document.querySelector("#btn_connexion").style.borderStyle = "outset";
        document.querySelector("#connexion").style.display = "none";
        document.querySelector("#inscription").style.display = "inline";
        document.querySelector("#fenetre").style.height = "410px";
        clicked = "inscription";
    }
}