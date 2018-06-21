import { Modele } from '../modele.js';

export class ModeleEcran extends Modele {
    constructor(socket) {
        super(socket);
        this._donjon = [];
        this._personnage = [];
        this._salleAffiche = null;
        this._pixelTaille = 32;
        this._etatMouvement = "idleBas";
        this._playerPosition = {
            x: 10,
            y : 6
        }
    }

    setDonjon(donjon) {
        this._donjon = donjon;
        this._salleAffiche = this._donjon._salles[this._donjon._spawn.x][this._donjon._spawn.y];
    }

    setPersonnage(personnage) {
        this._personnage = personnage;
    }
}

ModeleEcran.prototype.bougerPersonnage = function(haut, bas, gauche, droit) {
    if (haut) {
        this._etatMouvement = "idleHaut";
        this._playerPosition.y--;
    }
    if (bas) {
        this._etatMouvement = "idleBas";
        this._playerPosition.y++;
    }
    if (gauche) {
        this._etatMouvement = "idleGauche";
        this._playerPosition.x--;
    }
    if (droit) {
        this._etatMouvement = "idleDroit";
        this._playerPosition.x++;
    }
    console.log(this._playerPosition);
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