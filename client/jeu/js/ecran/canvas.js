export class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.RATIO = (16/9);
        this.size = {
            jeu : {
                width : 672,
                height: 384
            },
            style : {
                width : 800,
                height : 600
            }
        };
        this.resize();
        var canvas = this;
        window.addEventListener('resize', function(){
            this.resize();
        }.bind(this), false);
    }

    /*
    **  Ajuster le canvas à l'écran.
    **  Petit problème noté :
    **  Quand on F12 le canvas Height style
    **  prends tout l'écran.
    */
    resize() {
        this.size.style.width = window.innerWidth/1.5;
        this.size.style.height = window.innerHeight;

        //Le style qui sera toujours en version 16/9 pour chaque users
        if (this.size.style.height < this.size.style.width / this.RATIO) {
            this.size.style.width = (this.size.style.height * this.RATIO);
        } else {
            this.size.style.height = (this.size.style.width / this.RATIO);
        }
        this.canvas.style.width = Math.floor(this.size.style.width) + "px";
        this.canvas.style.height = Math.floor(this.size.style.height) + "px";

        // La dimension qu'affiche le Canvas.
        this.canvas.width = this.size.jeu.width;
        this.canvas.height = this.size.jeu.height;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    /*
    **  Clear le canvas actuel.
    */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
