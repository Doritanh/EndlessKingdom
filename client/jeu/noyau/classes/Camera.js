export class Camera {
    constructor(ecran) {
        this.ecran = ecran;
    }

    dimension(width, height) {
        this.width = width;
        this.height = height;
    }

    suit(personnage) {
        this.personnage = personnage;
    }
}