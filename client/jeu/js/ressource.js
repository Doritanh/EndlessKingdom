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
            BarbareDroite1 : {
                conteneur : new Image(),
                source : 'BarbareDroite(1).png'
            },
            BarbareDroite2 : {
                conteneur : new Image(),
                source : 'BarbareDroite(2).png'
            },
            BarbareDroite3 : {
                conteneur : new Image(),
                source : 'BarbareDroite(3).png'
            },
            BarbareHaut0 : {
                conteneur : new Image(),
                source : 'BarbareDos(0).png'
            },
            BarbareHaut1 : {
                conteneur : new Image(),
                source : 'BarbareDos(1).png'
            },
            BarbareHaut2 : {
                conteneur : new Image(),
                source : 'BarbareDos(2).png'
            },
            BarbareHaut3 : {
                conteneur : new Image(),
                source : 'BarbareDos(3).png'
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
            BarbareFace1 : {
                conteneur : new Image(),
                source : 'BarbareFace(1).png'
            },
            BarbareFace2 : {
                conteneur : new Image(),
                source : 'BarbareFace(2).png'
            },
            BarbareFace3 : {
                conteneur : new Image(),
                source : 'BarbareFace(3).png'
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
            },
            AttackBas : {
                conteneur : new Image,
                source : 'AttackBas.png'
            },
            AttackDroite : {
                conteneur : new Image,
                source : 'AttackDroite.png'
            },
            AttackGauche : {
                conteneur : new Image,
                source : 'AttackGauche.png'
            },
            AttackHaut : {
                conteneur : new Image,
                source : 'AttackHaut.png'
            },
            Crane : {
                conteneur : new Image,
                source : 'Crane.png'
            },
            Coffre : {
                conteneur : new Image,
                source : 'Coffre.png'
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