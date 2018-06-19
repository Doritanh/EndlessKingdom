import {Vue} from '../vue.js';

export class VueErreur extends Vue{
    constructor(modele) {
        super(modele);
        this._element = document.querySelector('#erreur');
    }
}