export class Ressource {
    constructor() {
        this._location = '/client/jeu/ressources/';
        this._images = {
            SolPierre : {
                conteneur : new Image(),
                source : 'SolPierre.png'
            },
            BarbareDroite0 : {
                conteneur : new Image(),
                source : 'BarbareDroite(0).png'
            },
            BarbareHaut0 : {
                conteneur : new Image(),
                source : 'BarbareDos(0).png'
            },
            BarbareGauche0 : {
                conteneur : new Image(),
                source : 'BarbareGauche(0).png'
            },
            BarbareGauche1 : {
                conteneur : new Image(),
                source : 'BarbareGauche(1).png'
            },
            BarbareGauche2 : {
                conteneur : new Image(),
                source : 'BarbareGauche(2).png'
            },
            BarbareGauche3 : {
                conteneur : new Image(),
                source : 'BarbareGauche(3).png'
            },
            BarbareFace0 : {
                conteneur : new Image(),
                source : 'BarbareFace(0).png'
            },
            MurHaut : {
                conteneur : new Image(),
                source : 'MurPierre.png'
            },
            MurBas : {
                conteneur : new Image(),
                source : 'MurPierre.png'
            },
            MurGauche : {
                conteneur : new Image(),
                source : 'MurPierre.png'
            },
            MurDroit : {
                conteneur : new Image(),
                source : 'MurPierre.png'
            },
            OrcFace : {
                conteneur : new Image(),
                source : 'OrcFace.png'
            }
        };
    }
}

Ressource.prototype.load = async function() {
    let self = this;
    let promesse = new Promise((resolve, reject) => {
        let data = {};

        for (let image in self._images) {
            self._images[image].conteneur.addEventListener('load', function() {
                data[image] = getBase64Image(self._images[image].conteneur);
                checkNumber();
            }, false);
        }
        let checkNumber = function() {
            if (Object.keys(data).length === Object.keys(self._images).length) {
                resolve(data);
            }
        }
    
        // Nom du fichier d'image
        for (let image in self._images) {
            self._images[image].conteneur.src = '' + self._location + self._images[image].source;
        }
    });
    
    return promesse;
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