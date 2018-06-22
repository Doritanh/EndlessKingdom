import { Modele } from '../modele.js';

export class ModeleEcran extends Modele {
    constructor(socket) {
        super(socket);
        this._donjon = [];
        this._personnage = [];
        this._salleAffiche = null;
        this._pixelTaille = 32;
        this._etatMouvement = "idleBas";
        this._position = {
            x : 0,
            y : 0
        }
        this._playerPosition = {
            x: 10,
            y : 6
        }
        this._ennemy = [];
    }

    setDonjon(donjon) {
        this._donjon = donjon;
        this._position.x = this._donjon._spawn.x;
        this._position.y = this._donjon._spawn.y;
        this._salleAffiche = this._donjon._salles[this._donjon._spawn.x][this._donjon._spawn.y];
        console.log(this._salleAffiche)
    }

    setPersonnage(personnage) {
        this._personnage = personnage;
    }
}

ModeleEcran.prototype.bougerPersonnage = function(haut, bas, gauche, droit) {
    if (haut) {
        this._etatMouvement = "idleHaut";
        if (this._playerPosition.y > 0) {
            this._playerPosition.y--;
        }
    }
    if (bas) {
        this._etatMouvement = "idleBas";
        if (this._playerPosition.y < this._salleAffiche._taille.y) {
            this._playerPosition.y++;
        }
    }
    if (gauche) {
        this._etatMouvement = "idleGauche";
        if (this._playerPosition.x > 0) {
            this._playerPosition.x--;
        }
    }
    if (droit) {
        this._etatMouvement = "idleDroit";
        if (this._playerPosition.x < this._salleAffiche._taille.x) {
            this._playerPosition.x++;
        }
    }
    if (this._playerPosition.x == 10 && this._playerPosition.y == 0 
        && this._etatMouvement == 'idleHaut') {
        if (this._salleAffiche._portes.north == true) {
            this._position.x--;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.y = this._salleAffiche._taille.y;
        }
    }
    if (this._playerPosition.x == 10 && this._playerPosition.y == this._salleAffiche._taille.y 
        && this._etatMouvement == 'idleBas') {
        if (this._salleAffiche._portes.south == true) {
            this._position.x++;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.y = 0;
        }
    }
    if (this._playerPosition.x == 0 && this._playerPosition.y == 5 && this._etatMouvement == 'idleGauche') {
        if (this._salleAffiche._portes.west == true) {
            this._position.y--;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.x = this._salleAffiche._taille.x;
        }
    }
    if (this._playerPosition.x == this._salleAffiche._taille.x && this._playerPosition.y == 5
        && this._etatMouvement == 'idleDroit') {
        if (this._salleAffiche._portes.east == true) {
            this._position.y++;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.x = 0;
        }
    }
    console.log(this._playerPosition);
}

ModeleEcran.prototype.creerEnnemy = function() {
    this._ennemy = [];
    nbEnnemy = this._salleAffiche._nbMonstre;
    for (let i =0; i< nbEnnemy; i++)
    {
        let orc = new Orc(generationNombre(2,this._salleAffiche._taille.x-2),generationNombre(2,this._salleAffiche._taille.y-2));   
        this._ennemy[i] = orc;
    }
}

ModeleEcran.prototype.bougerEnnemy = function() {
    this._ennemy.forEach(e => {
        e._pos.x += 1; 
        e._pos.y += 1;
    });
}



var generationNombre = function(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

class Entity{
    //PV : Points de Vie, ATK : Points d'attack
    constructor(PV,ATK,X,Y)
    {
        this.PV = PV;
        this.ATK = ATK;
        this._pos = {
            x = X,
            y = Y
        }
    }
}

class Orc extends Entity{
    constructor(X,Y)
    {
        super(10,5,X,Y);
    }
}
class Barbare extends Entity{
    constructor(X,Y)
    {
        super(10,5,X,Y);
    }
}
class Magicien extends Entity{
    constructor(X,Y)
    {
        super(7,7,X,Y);
    }
}
class Archer extends Entity{
    constructor(X,Y)
    {
        super(8,6,X,Y);
    }
} 