import { Vue } from '../vue.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
        this.init();
    }
}

VueEcran.prototype.init = function() {
    let img = new Image();
    img.onload = function() {
        for (let i = 0; i < this._modele._donjon._taille; i++) {
            for (let j = 0; j < this._modele._donjon._taille; j++) {
                this._element.getContext('2d').drawImage(img, i*32,j*32);
            }
        }
    }.bind(this);
    img.src = '/client/jeu/ressources/SolPierre.png';
}

VueEcran.prototype.dessiner = function() {
    
}