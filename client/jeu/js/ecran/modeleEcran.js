import { Modele } from '../modele.js';

export class ModeleEcran extends Modele {
    constructor(socket) {
        super(socket);
        this._donjon = [];
        this._personnage = [];
        this._salleAffiche = "";
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
            this.creerEnnemy(this._salleAffiche);
            this._playerPosition.y = this._salleAffiche._taille.y;
            setInterval(function(){
                this.bougerEnnemy();
            }.bind(this),1000/2);

        }
    }
    if (this._playerPosition.x == 10 && this._playerPosition.y == this._salleAffiche._taille.y 
        && this._etatMouvement == 'idleBas') {
        if (this._salleAffiche._portes.south == true) {
            this._position.x++;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this.creerEnnemy(this._salleAffiche);
            this._playerPosition.y = 0;
            setInterval(function(){
                this.bougerEnnemy();
            }.bind(this),1000/2);
        }
    }
    if (this._playerPosition.x == 0 && this._playerPosition.y == 5 && this._etatMouvement == 'idleGauche') {
        if (this._salleAffiche._portes.west == true) {
            this._position.y--;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this.creerEnnemy(this._salleAffiche);
            this._playerPosition.x = this._salleAffiche._taille.x;
            setInterval(function(){
                this.bougerEnnemy();
            }.bind(this),1000/2);
        }
    }
    if (this._playerPosition.x == this._salleAffiche._taille.x && this._playerPosition.y == 5
        && this._etatMouvement == 'idleDroit') {
        if (this._salleAffiche._portes.east == true) {
            this._position.y++;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this.creerEnnemy(this._salleAffiche);
            this._playerPosition.x = 0;
            setInterval(function(){
                this.bougerEnnemy();
            }.bind(this),1000/1);
        }
    }
    console.log(this._playerPosition);
}

ModeleEcran.prototype.creerEnnemy = function(salle) {
    this._ennemy = [];
    console.log(salle)
    this._nbEnnemy = salle._nbMonstre;
    console.log(salle._nbMonstre);
    for (let i =0; i< this._nbEnnemy; i++)
    {
        console.log("ORC");
        let orc = new Orc(generationNombre(2,this._salleAffiche._taille.x-2),generationNombre(2,this._salleAffiche._taille.y-2));   
        this._ennemy[i] = orc;
    }
}

ModeleEcran.prototype.bougerEnnemy = function() {
    let direction = this.cheminEnnemy(this._ennemy[0]);
    this._ennemy.forEach(e => {
        e._pos.x += direction.x; 
        e._pos.y += direction.y;
    });
}

ModeleEcran.prototype.cheminEnnemy = function(ennemy)
{
    let direction = {
        x:0,
        y:0
    }
    if (this._playerPosition.x - ennemy._pos.x > 0)
    {
        direction.x = 1;
    }
    else if (this._playerPosition.x - ennemy._pos.x < 0)
    {
        direction.x = -1;
    }
    if (this._playerPosition.y - ennemy._pos.y > 0)
    {
        direction.y = 1;
    }
    else if (this._playerPosition.y - ennemy._pos.y < 0)
    {
        direction.y = -1;
    }
    return direction;
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
            x : X,
            y : Y
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