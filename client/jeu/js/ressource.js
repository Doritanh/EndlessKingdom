export class Ressource {
    constructor() {
        this._location = '/client/jeu/ressources/';
        this._images = [];
    }
}

Ressource.prototype.load = function(callback) {
    let solPierre = new Image();
    let barbareFace = new Image();
    barbareFace.addEventListener('load', function() {
        let data = {};
        data['SolPierre'] = getBase64Image(solPierre);
        data['BarbareFace'] = getBase64Image(barbareFace);
        callback(data);
    }, false);
    solPierre.src = '' + this._location + 'SolPierre.png';
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