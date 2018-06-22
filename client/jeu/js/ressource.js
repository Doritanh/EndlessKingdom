export class Ressource {
    constructor() {
        this._location = '/client/jeu/ressources/';
        this._images = {
            SolPierre : {
                conteneur : new Image(),
                source : 'SolPierre.png'
            },
            BarbareDroite : {
                conteneur : new Image(),
                source : 'BarbareDroite.png'
            },
            BarbareHaut : {
                conteneur : new Image(),
                source : 'BarbareDos.png'
            },
            BarbareGauche : {
                conteneur : new Image(),
                source : 'BarbareGauche.png'
            },
            BarbareFace : {
                conteneur : new Image(),
                source : 'BarbareFace.png'
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
            },
            HealthBar0 : {
                conteneur : new Image(),
                source : 'HealthBar0.png'
            },
            HealthBarContent0 : {
                conteneur : new Image(),
                source : 'HealthBarContent0.png'
            },
            HealthBar1 : {
                conteneur : new Image(),
                source : 'HealthBar1.png'
            },
            HealthBarContent1 : {
                conteneur : new Image(),
                source : 'HealthBarContent1.png'
            },
            Heart : {
                conteneur : new Image,
                source : 'Heart.png'
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