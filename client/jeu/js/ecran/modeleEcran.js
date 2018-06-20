import { Modele } from '../modele.js';

export class ModeleEcran extends Modele {
    constructor(socket) {
        super(socket);
        this._donjon = null;
        this._salle = null;
        this._tiles = [];
        this.init();
    }

    setDonjon(donjon) {
        console.log(donjon)
        this._donjon = donjon;
    }

    init() {
        for(let i = 0; i < 32; i++) {
            this._tiles[i] = [];
            for (let j = 0; j < 32; j++) {
                this._tiles[i][j] = 1;
            }
        }
    }
}

class Salle {
     constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        let playerPresent = false;
        let ennemyArray = [];
    }
}

class Entity{
    //PV : Points de Vie, ATK : Points d'attack
    constructor(PV,ATK)
    {
        this.PV = PV;
        this.ATK = ATK;
    }
}

class Orc extends Entity{
    constructor()
    {
        super(10,5);
    }
}
class Barbare extends Entity{
    constructor()
    {
        super(10,5);
    }
}
class Magicien extends Entity{
    constructor()
    {
        super(7,7); 
    }
}
class Archer extends Entity{
    constructor()
    {
        super(8,6);
    }

}