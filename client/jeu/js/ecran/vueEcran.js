import { Vue } from '../vue.js';
import { Canvas } from './canvas.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
        this._background = new Canvas(this._element.querySelector('.background'));
        this._foreground = new Canvas(this._element.querySelector('.foreground'));
        this._effects = new Canvas(this._element.querySelector('.effects'));
        this._images = getImages();

        this._modele.addEventListener('changementSalle', function() {
            this.dessinerSalle();
        }.bind(this));
        this._modele.addEventListener("Attack",function() {
            this.dessinerAttack();
        }.bind(this));
        this._modele.addEventListener("Mort",function(ennemy) {
            this.dessinerMort(ennemy);
        }.bind(this));
    }
}

VueEcran.prototype.dessiner = function() {
    // Avant plan
    setInterval(function() {
        this._foreground.clear();
        this.dessinerJoueur();
        this.dessinerEnnemy();
    }.bind(this), 1000/60);
    // Plan d'effets
    setInterval(function() {
        this.dessinerBarDeVie();
    }.bind(this), 1000/60);
}

VueEcran.prototype.dessinerJoueur = function() {
    this._foreground.ctx.drawImage(this._images[this._modele._nomFrameMouvement], this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
}

VueEcran.prototype.dessinerEnnemy = function() {
    if (typeof this._modele._ennemy[0] !== 'undefined') {
        this._foreground.ctx.drawImage(this._images['OrcFace'], this._modele._ennemy[0]._pos.x*32,this._modele._ennemy[0]._pos.y*32)
    }
}

VueEcran.prototype.dessinerSalle = function() {
    this._background.clear();
    let ctx = this._background.ctx;

    for(let i = 0; i <= this._modele._salleAffiche._taille.x; i++) {
        for (let j = 0; j <= this._modele._salleAffiche._taille.y; j++) {
            switch(this._modele._salleAffiche._matrice[i][j]) {
                case 1:
                    ctx.drawImage(this._images['SolPierre'], i*32,j*32);
                    break;
                case 2:
                    ctx.drawImage(this._images['MurHaut'], i*32,j*32);
                    break;
                default:
                    ctx.fillRect(i*32,j*32,i*32+32,i*32+32);
                    break;
            }
        }
    }
}

VueEcran.prototype.dessinerAttack = function() {
    let ctx = this._foreground.ctx;
    switch (this._modele._etatMouvement){
        case 'idleGauche':
            ctx.drawImage(this._images['AttackGauche'],(this._modele._playerPosition.x -1)*32, (this._modele._playerPosition.y)*32);
            break;
        case 'idleDroit':
            ctx.drawImage(this._images['AttackDroite'],(this._modele._playerPosition.x +1)*32, (this._modele._playerPosition.y)*32);
            break;
        case 'idleBas':
            ctx.drawImage(this._images['AttackBas'],(this._modele._playerPosition.x)*32, (this._modele._playerPosition.y +1)*32);
            break;
        case 'idleHaut':
             ctx.drawImage(this._images['AttackHaut'],(this._modele._playerPosition.x)*32 , (this._modele._playerPosition.y-1)*32);
            break;
    }
}

VueEcran.prototype.dessinerMort = function(ennemy) {
    this._foreground.ctx.drawImage(this._images['Crane'],(ennemy._pos.x)*32, (ennemy._pos.y)*32);
}

VueEcran.prototype.dessinerBarDeVie = function() {
    let ctx = this._effects.ctx;
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
    ctx.drawImage(this._images['HealthBarContent0'], posXHealthBar-32, 0);
    ctx.drawImage(this._images['HealthBar0'], 0, 0, swHB0, 32, posXHealthBar-32, 0, dwHB0, 32);
    ctx.drawImage(this._images['HealthBarContent1'], posXHealthBar, 0);
    ctx.drawImage(this._images['HealthBar1'], 0, 0, swHB1, 32, posXHealthBar, 0, dwHB1, 32);
    ctx.drawImage(this._images['Heart'], posXHealthBar-48, 0);
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
        AttackBas : new Image(),
        AttackDroite : new Image(),
        AttackGauche : new Image(),
        AttackHaut : new Image(),
        Crane : new Image()
    }
    for (let nomImage in images) {
        images[nomImage].src = "data:image/png;base64," + dataImage[nomImage];
    }
    return images;
}