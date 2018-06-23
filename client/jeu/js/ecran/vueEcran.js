import { Vue } from '../vue.js';

import { Canvas } from './canvas.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
        this._canvas = new Canvas(this._element.querySelector('canvas'));
        this._ctx = this._element.querySelector('canvas').getContext('2d');
        this._images = getImages();
        this._modele.addEventListener('changementSalle', function() {
            console.log("changer salle !")
        });
    }
}

VueEcran.prototype.dessiner = function() { 
    this._canvas.clear();
    this.dessinerSalle();
    this.dessinerJoueur();
    this.dessinerEnnemy();
    this.dessinerBarDeVie();
    this.dessinerAttack();
}

VueEcran.prototype.dessinerSalle = function() {
    for(let i = 0; i <= this._modele._salleAffiche._taille.x; i++) {
        for (let j = 0; j <= this._modele._salleAffiche._taille.y; j++) {
            console.log(this._modele._salleAffiche._matrice[i][j]);
            switch(this._modele._salleAffiche._matrice[i][j])
            {
                case 0:
                console.log("vide");
                    this._ctx.fillRect(i*32,j*32,i*32+32,i*32+32)
                    break;
                case 1:
                    console.log("sol");
                    this._ctx.drawImage(this._images['SolPierre'], i*32,j*32);
                    break;
                case 2:
                    console.log("mur");
                    this._ctx.drawImage(this._images['MurHaut'], i*32,j*32);
                    break;
            }
        }
    }
}

VueEcran.prototype.dessinerJoueur = function() {
    this._ctx.drawImage(this._images[this._modele._nomFrameMouvement], this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
}

VueEcran.prototype.dessinerEnnemy = function() {
    if (typeof this._modele._ennemy[0] !== 'undefined')
    {
        this._ctx.drawImage(this._images['OrcFace'], this._modele._ennemy[0]._pos.x*32,this._modele._ennemy[0]._pos.y*32)
    }
    
}


VueEcran.prototype.dessinerAttack = function(){
    this._modele.addEventListener("Attack",function() {
        switch (this._modele._etatMouvement){
            case 'idleGauche':
                this._ctx.drawImage(this._images['Attack'],(this._modele._playerPosition.x -1)*32, (this._modele._playerPosition.y)*32);
                break;
            case 'idleDroit':
                this._ctx.drawImage(this._images['Attack'],(this._modele._playerPosition.x +1)*32, (this._modele._playerPosition.y)*32);
                break;
            case 'idleBas':
                this._ctx.drawImage(this._images['Attack'],(this._modele._playerPosition.x)*32, (this._modele._playerPosition.y +1)*32);
                break;
            case 'idleHaut':
                 this._ctx.drawImage(this._images['Attack'],(this._modele._playerPosition.x)*32 , (this._modele._playerPosition.y-1)*32);
                break;
        }
    }.bind(this)); 
    this._modele.addEventListener("Mort",function(ennemy) {
        this._ctx.drawImage(this._images['Crane'],(ennemy._pos.x)*32, (ennemy._pos.y)*32);
    }.bind(this)); 
}
VueEcran.prototype.dessinerBarDeVie = function() {
    let posXHealthBar = 60;
    let swHB0 = 32;
    let dwHB0 = 32;
    let swHB1 = 32;
    let dwHB1 = 32;
    let pourcentVie = (this._modele._personnage._PV/this._modele._personnage._maxPV).toPrecision(2);
    if(pourcentVie > 0.5) {
        pourcentVie = pourcentVie * 2 - 1;
        swHB1 *= pourcentVie;
        dwHB1 *= pourcentVie;
    } else {
        pourcentVie *= 2;
        swHB0 *= pourcentVie;
        dwHB0 *= pourcentVie;
        swHB1 = 1;
        dwHB1 = 0;
    }
    if(swHB0 == 0) swHB0 = 1;
    this._ctx.drawImage(this._images['HealthBarContent0'], posXHealthBar-32, 0);
    this._ctx.drawImage(this._images['HealthBar0'], 0, 0, swHB0, 32, posXHealthBar-32, 0, dwHB0, 32);
    this._ctx.drawImage(this._images['HealthBarContent1'], posXHealthBar, 0);
    this._ctx.drawImage(this._images['HealthBar1'], 0, 0, swHB1, 32, posXHealthBar, 0, dwHB1, 32);
    this._ctx.drawImage(this._images['Heart'], posXHealthBar-48, 0);
}

let getImages = function() {
    let dataImage = JSON.parse(sessionStorage.getItem('ressources'));
    let images = {
        SolPierre : new Image(),
        BarbareFace0 : new Image(),
        BarbareFace1 : new Image(),
        BarbareFace2 : new Image(),
        BarbareFace3 : new Image(),
        BarbareDroite0 : new Image(),
        BarbareDroite1 : new Image(),
        BarbareDroite2 : new Image(),
        BarbareDroite3 : new Image(),
        BarbareHaut0 : new Image(),
        BarbareHaut1 : new Image(),
        BarbareHaut2 : new Image(),
        BarbareHaut3 : new Image(),
        BarbareGauche0 : new Image(),
        BarbareGauche1 : new Image(),
        BarbareGauche2 : new Image(),
        BarbareGauche3 : new Image(),
        MurHaut : new Image(),
        MurBas : new Image(),
        MurGauche : new Image(),
        MurDroit : new Image(),
        OrcFace : new Image(),
        HealthBar0 : new Image(),
        HealthBarContent0 : new Image(),
        HealthBar1 : new Image(),
        HealthBarContent1 : new Image(),
        Heart : new Image(),
        Attack : new Image(),
        Crane : new Image()
    }
    for (let nomImage in images) {
        images[nomImage].src = "data:image/png;base64," + dataImage[nomImage];
    }
    return images;
}