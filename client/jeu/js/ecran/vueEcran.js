import { Vue } from '../vue.js';

import { Canvas } from './canvas.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
        this._canvas = new Canvas(this._element.querySelector('canvas'));
        this._ctx = this._element.querySelector('canvas').getContext('2d');
        this._images = getImages()
    }
}

VueEcran.prototype.dessiner = function() {
    // Clear canvas
    this._canvas.clear();

    // Dessiner la salle
    this.dessinerSalle();

    // Joueur
    this.dessinerJoueur();

    this.dessinerEnnemy();

    this.dessinerBarDeVie();
}

VueEcran.prototype.dessinerSalle = function() {
    for(let i = 0; i <= this._modele._salleAffiche._taille.x; i++) {
        for (let j = 0; j <= this._modele._salleAffiche._taille.y; j++) {
            this._ctx.drawImage(this._images[this._modele._salleAffiche._matrice[i][j]], i*32,j*32);
        }
    }
}

VueEcran.prototype.dessinerJoueur = function() {
    let nomImage = 'BarbareFace';
    switch(this._modele._etatMouvement) {
        case "idleBas" :
            nomImage = 'BarbareFace';
            break;
        case "idleDroit" :
            nomImage = 'BarbareDroite';
            break;
        case "idleHaut" :
            nomImage = 'BarbareHaut';
            break;
        case "idleGauche" :
            nomImage = 'BarbareGauche';
            break;
    }
    this._ctx.drawImage(this._images[nomImage], this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
}

VueEcran.prototype.dessinerEnnemy = function() {
    if (typeof this._modele._ennemy[0] !== 'undefined')
    {
        this._ctx.drawImage(this._images['OrcFace'], this._modele._ennemy[0]._pos.x*32,this._modele._ennemy[0]._pos.y*32)
    }
    
}

VueEcran.prototype.dessinerBarDeVie = function() {
    let posXHealthBar = 60;
    this._ctx.drawImage(this._images['HealthBarContent0'], posXHealthBar-32, 0);  
    this._ctx.drawImage(this._images['HealthBar0'], posXHealthBar-32, 0);
    this._ctx.drawImage(this._images['HealthBarContent1'], posXHealthBar, 0);  
    this._ctx.drawImage(this._images['HealthBar1'], posXHealthBar, 0);
    this._ctx.drawImage(this._images['Heart'], posXHealthBar-48, 0);
    
}

let getImages = function() {
    let dataImage = JSON.parse(sessionStorage.getItem('ressources'));
    let images = {
        SolPierre : new Image(),
        BarbareFace : new Image(),
        BarbareDroite : new Image(),
        BarbareHaut : new Image(),
        BarbareGauche : new Image(),
        MurHaut : new Image(),
        MurBas : new Image(),
        MurGauche : new Image(),
        MurDroit : new Image(),
        OrcFace : new Image(),
        HealthBar0 : new Image(),
        HealthBarContent0 : new Image(),
        HealthBar1 : new Image(),
        HealthBarContent1 : new Image(),
        Heart : new Image()
    }
    for (let nomImage in images) {
        images[nomImage].src = "data:image/png;base64," + dataImage[nomImage];
    }
    return images;
}