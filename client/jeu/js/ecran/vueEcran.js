import { Vue } from '../vue.js';

import { Canvas } from './canvas.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
        this._canvas = new Canvas(this._element);
    }
}


VueEcran.prototype.dessiner = async function() {
    this._canvas.clear();
    let dataImage = JSON.parse(sessionStorage.getItem('ressources'));
    //Images Decors
    let solPierre = new Image();
    solPierre.src = "data:image/png;base64," + dataImage['SolPierre'];
    //------

    //Images Persos
    let barbareFace = new Image();
    let barbareDroite = new Image();
    let barbareHaut = new Image();
    let barbareGauche = new Image();
    barbareFace.src = "data:image/png;base64," + dataImage['BarbareFace'];
    barbareDroite.src = "data:image/png;base64," + dataImage['BarbareDroite'];
    barbareHaut.src = "data:image/png;base64," + dataImage['BarbareHaut'];
    barbareGauche.src = "data:image/png;base64," + dataImage['BarbareGauche'];
    //--------

    for(let i = 0; i < this._modele._salleAffiche._taille.x; i++) {
        for (let j = 0; j < this._modele._salleAffiche._taille.y; j++) {
            this._element.getContext('2d').drawImage(solPierre, i*32,j*32);
        }
    }

    //Animations
    switch(this._modele._etatMouvement) {
        case "idleBas" :
            this._element.getContext('2d').drawImage(barbareFace, this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
            break;
        case "idleDroit" :
            this._element.getContext('2d').drawImage(barbareDroite, this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
            break;
        case "idleHaut" :
            this._element.getContext('2d').drawImage(barbareHaut, this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
            break;
        case "idleGauche" :
            this._element.getContext('2d').drawImage(barbareGauche, this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
            break;
    }
    //---------
}

VueEcran.prototype.animation = function() {
    let dataImage = JSON.parse(sessionStorage.getItem('ressources'));
    let barbareFace = new Image();
    barbareFace.src = "data:image/png;base64," + dataImage['BarbareFace'];
   // switch(this._modele._etatMouvement) {
        //case "idleBas" :
        console.log("bwah")
            this._element.getContext('2d').drawImage(barbareFace, this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
            //break;
    //}
    
}