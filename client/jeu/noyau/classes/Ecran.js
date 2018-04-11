class Ecran {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
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
}
