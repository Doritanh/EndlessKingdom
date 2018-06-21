export class Ressource {
    constructor() {
        this._location = '/client/jeu/ressources/';
        this._images = [];
    }
}

Ressource.prototype.load = function(callback) {
    //Ressources Decors
    let solPierre = new Image();
    //----
    //Ressources Persos
    let barbareDroite = new Image();
    let barbareHaut = new Image();
    let barbareGauche = new Image();
    let barbareFace = new Image();
    //----
    barbareFace.addEventListener('load', function() {
        let data = {};
        data['SolPierre'] = getBase64Image(solPierre);
        data['BarbareFace'] = getBase64Image(barbareFace);
        data['BarbareDroite'] = getBase64Image(barbareDroite);
        data['BarbareHaut'] = getBase64Image(barbareHaut);
        data['BarbareGauche'] = getBase64Image(barbareGauche);
        callback(data);
    }, false);
    solPierre.src = '' + this._location + 'SolPierre.png';
    barbareDroite.src = '' + this._location + 'BarbareDroite.png';
    barbareHaut.src = '' + this._location + 'BarbareDos.png';
    barbareGauche.src = '' + this._location + 'BarbareGauche.png'
    barbareFace.src = '' + this._location + 'BarbareFace.png';
    
}

let getBase64Image = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}