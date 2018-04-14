export class Ecran {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    dimension(width, height) {
        this.canvas.style.height = height;
        this.canvas.style.width = width;
        this.height = height;
        this.width = width;
    }

    backgroundRGB(r, g, b) {
        this.canvas.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
    }

    chargement() {
        this.ctx.font = "30px Sans-Serif";
        this.ctx.fillText("EndlessKingdom", 10, 50);
    }
}
