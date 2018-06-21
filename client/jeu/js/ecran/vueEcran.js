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
    let solPierre = new Image();
    solPierre.src = "data:image/png;base64," + dataImage['SolPierre'];
    let barbareFace = new Image();
    barbareFace.src = "data:image/png;base64," + dataImage['BarbareFace'];
    for(let i = 0; i < this._modele._salleAffiche._taille.x; i++) {
        for (let j = 0; j < this._modele._salleAffiche._taille.y; j++) {
            this._element.getContext('2d').drawImage(solPierre, i*32,j*32);
        }
    }
    this._element.getContext('2d').drawImage(barbareFace, this._modele._playerPosition.x*32, this._modele._playerPosition.y*32);
}