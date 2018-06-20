import { Vue } from '../vue.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
    }
}

VueEcran.prototype.dessiner = function() {
    
}