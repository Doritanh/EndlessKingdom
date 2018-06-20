import { Vue } from '../vue.js';

export class VueEcran extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#ecran");
        this._cache = [];
        this._image = [];
        this._pixels = 32;
        this._tiles = modele._tiles;

        this.dessiner();
    }
}

VueEcran.prototype.dessiner = function() {
    for (var i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            this._cache[this._tiles[i][j]] = new Image();
        }
    }
    this._cache[this._tiles[31][31]].addEventListener('load', e => {
        generer();
    });
    for (var i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            this._cache[this._tiles[i][j]].src = './SolPierre.png';
        }
    }

    let generer = function() {
        var ctx = document.createElement("canvas").getContext('2d');
        ctx.canvas.width = 1024;
        ctx.canvas.height = 1024;
        for (var i = 0; i < 32; i++) {
            for (var j = 0; j < 32; j++) {
                ctx.drawImage(this.cache[1], i*this.pixels, j*this.pixels);
            }
        }
        let image = new Image();
        image.src = ctx.canvas.toDataURL("image/png");

        ctx = null;

        ctx = this._element.getContext('2d');
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

    }
}