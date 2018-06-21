import { Modele } from '../modele.js';

export class ModeleEcran extends Modele {
    constructor(socket) {
        super(socket);
        this._donjon = [];
        this._personnage = [];
        this._salleAffiche = null;
    }

    setDonjon(donjon) {
        this._donjon = donjon;
        this._salleAffiche = this._donjon._salles[this._donjon._spawn.x][this._donjon._spawn.y];
        //this._donjon._spawn;
    }

    setPersonnage(personnage) {
        this._personnage = personnage;
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