import { Modele } from '../modele.js';

export class ModeleEcran extends Modele {
    constructor(socket) {
        super(socket);
        this._donjon = [];
        this._personnage = [];
        this._salleAffiche = "";
        this._pixelTaille = 32;
        this._etatMouvement = "idleBas";
        this._numeroFrameMouvement = 0;
        this._nomFrameMouvement = "BarbareFace0";
        this._timerAnimationPerso = 0;
        this._position = {
            x : 0,
            y : 0
        }
        this._playerPosition = {
            x: 10,
            y : 6
        }
        this._ennemy = [];
        this._intervalles = [];
    }

    setDonjon(donjon) {
        this._donjon = donjon;
        this._position.x = this._donjon._spawn.x;
        this._position.y = this._donjon._spawn.y;
        this._salleAffiche = this._donjon._salles[this._donjon._spawn.x][this._donjon._spawn.y];
        this.loadEvent('changementSalle');
    }

    setPersonnage(personnage) {
        this._personnage = personnage;
    }
}

ModeleEcran.prototype.changeSalle = function(direction) {
    switch (direction) {
        case 'north':
            this._position.x--;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.y = this._salleAffiche._taille.y;
            break;
        case 'south':
            this._position.x++;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.y = 0;
            break;
        case 'west':
            this._position.y--;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.x = this._salleAffiche._taille.x;
            break;
        case 'east':
            this._position.y++;
            this._salleAffiche = this._donjon._salles[this._position.x][this._position.y];
            this._playerPosition.x = 0;
            break;
    }
    this.creerEnnemy(this._salleAffiche);
    for (let interval in this._intervalles) {
        clearInterval(this._intervalles[interval]);
    }
    if(this._salleAffiche._nbMonstre > 0) {
        let interval = setInterval(function(){
            this.bougerEnnemy();
            this.attaqueEnnemy();
        }.bind(this),1000/2);
        this._intervalles.push(interval);
    }
    this.loadEvent('changementSalle');
}

ModeleEcran.prototype.animationMouvement = function(direction) {
    switch(direction) {
        case "haut":
            if(this._salleAffiche._matrice[this._playerPosition.x][this._playerPosition.y -1] == 1) {
                let animationHaut = setInterval(function() {
                    this._playerPosition.y -= 0.03125;
                    this._timerAnimationPerso++;
                    if(this._timerAnimationPerso%8 === 0) {
                        this._numeroFrameMouvement++;
                        if(this._numeroFrameMouvement === 4) this._numeroFrameMouvement = 0;
                        this._nomFrameMouvement = "BarbareHaut" + this._numeroFrameMouvement.toString();
                    }
                    if(this._timerAnimationPerso === 32) {
                        this._timerAnimationPerso = 0;
                        clearInterval(animationHaut);
                    }
                }.bind(this), 1);
            }
            break;
        case "bas":
            let animationBas = setInterval(function() {
                this._playerPosition.y += 0.03125;
                this._timerAnimationPerso++;
                if(this._timerAnimationPerso%8 === 0) {
                    this._numeroFrameMouvement++;
                    if(this._numeroFrameMouvement === 4) this._numeroFrameMouvement = 0;
                    this._nomFrameMouvement = "BarbareFace" + this._numeroFrameMouvement.toString();
                }
                if(this._timerAnimationPerso === 32) {
                    this._timerAnimationPerso = 0;
                    clearInterval(animationBas);
                }
            }.bind(this), 1);
            break;
        case "gauche":
            let animationGauche = setInterval(function() {
                this._playerPosition.x -= 0.03125;
                this._timerAnimationPerso++;
                if(this._timerAnimationPerso%8 === 0) {
                    this._numeroFrameMouvement++;
                    if(this._numeroFrameMouvement === 4) this._numeroFrameMouvement = 0;
                    this._nomFrameMouvement = "BarbareGauche" + this._numeroFrameMouvement.toString();
                }
                if(this._timerAnimationPerso === 32) {
                    this._timerAnimationPerso = 0;
                    clearInterval(animationGauche);
                }
            }.bind(this), 1);
            break;
        case "droite":
            let animationDroite = setInterval(function() {
                this._playerPosition.x += 0.03125;
                this._timerAnimationPerso++;
                if(this._timerAnimationPerso%8 === 0) {
                    this._numeroFrameMouvement++;
                    if(this._numeroFrameMouvement === 4) this._numeroFrameMouvement = 0;
                    this._nomFrameMouvement = "BarbareDroite" + this._numeroFrameMouvement.toString();
                }
                if(this._timerAnimationPerso === 32) {
                    this._timerAnimationPerso = 0;
                    clearInterval(animationDroite);
                }
            }.bind(this), 1);
            break;
    }
    
}


ModeleEcran.prototype.bougerPersonnage = function(haut, bas, gauche, droit) {
    if(this._timerAnimationPerso === 0) {
        if (haut && !bas && !gauche && !droit) {
            this._etatMouvement = "idleHaut";
            this._nomFrameMouvement = "BarbareHaut0";
            if (this._playerPosition.y > 0) {
                //Si la prochaine case est du sol
                if(this._salleAffiche._matrice[this._playerPosition.x][this._playerPosition.y -1] == 1)
                {
                    this.animationMouvement("haut");
                }
            }
            
        }
        if (bas && !haut && !gauche && !droit) {
            this._etatMouvement = "idleBas";
            this._nomFrameMouvement = "BarbareFace0";
            if (this._playerPosition.y < this._salleAffiche._taille.y) {
                //Si la prochaine case est du sol
                if(this._salleAffiche._matrice[this._playerPosition.x][this._playerPosition.y +1] == 1)
                {
                    this.animationMouvement("bas");
                }
                
            }
        }
        if (gauche && !haut && !bas && !droit) {
            this._etatMouvement = "idleGauche";
            this._nomFrameMouvement = "BarbareGauche0";
            if (this._playerPosition.x > 0) {
                //Si la prochaine case est du sol
                if(this._salleAffiche._matrice[this._playerPosition.x - 1][this._playerPosition.y] == 1)
                {
                    this.animationMouvement("gauche");
                }
            }
        }
        if (droit && !haut && !bas && !gauche) {
            this._etatMouvement = "idleDroit";
            this._nomFrameMouvement = "BarbareDroite0";
            if (this._playerPosition.x < this._salleAffiche._taille.x) {
            //Si la prochaine case est du sol
            if(this._salleAffiche._matrice[this._playerPosition.x + 1][this._playerPosition.y] == 1)
            {
                this.animationMouvement("droite");
            }
            }
        }
    }
    if (this._playerPosition.x == 10 && this._playerPosition.y == 0 
        && this._etatMouvement == 'idleHaut') {
        if (this._salleAffiche._portes.north == true) {
            this.changeSalle('north');
        }
    }
    if (this._playerPosition.x == 10 && this._playerPosition.y == this._salleAffiche._taille.y 
        && this._etatMouvement == 'idleBas') {
        if (this._salleAffiche._portes.south == true) {
            this.changeSalle('south');
        }
    }
    if (this._playerPosition.x == 0 && this._playerPosition.y == 5 && this._etatMouvement == 'idleGauche') {
        if (this._salleAffiche._portes.west == true) {
            this.changeSalle('west');
        }
    }
    if (this._playerPosition.x == this._salleAffiche._taille.x && this._playerPosition.y == 5
        && this._etatMouvement == 'idleDroit') {
        if (this._salleAffiche._portes.east == true) {
            this.changeSalle('east');
        }
    }
}

ModeleEcran.prototype.attaquer = function() {
    let x;
    let y;
    switch (this._etatMouvement){
        case 'idleGauche':
            x = -1;
            y = 0;
           break;
        case 'idleDroit':
            x = 1;
            y = 0;
            break;
        case 'idleBas':
            x = 0;
            y = 1;
            break;
        case 'idleHaut':
            x = 0;
            y =-1;
            break;
    }
    
    this._ennemy.forEach(e => {
        if((e._pos.x == this._playerPosition.x && e._pos.y == this._playerPosition.y )){
            e._PV -= 5;
        }
        else if(e._pos.x == this._playerPosition.x + x && e._pos.y == this._playerPosition.y + y)
        {
            e._PV -= 5;
        }
        this.loadEvent("Attack");

        if(e._PV <= 0)
        {
            for(let i =0; i< this._ennemy.length; i++)
            {
                if (this._ennemy[i] == e)
                {
                    this._ennemy.splice(i,1);
                    this._salleAffiche._nbMonstre -= 1;
                }
            }
            this.loadEvent("Mort", e);
        }
    });
}

ModeleEcran.prototype.creerEnnemy = function(salle) {
    this._ennemy = [];
    this._nbEnnemy = salle._nbMonstre;
    for (let i =0; i< this._nbEnnemy; i++)
    {
        let orc = new Orc(generationNombre(2,this._salleAffiche._taille.x-2),generationNombre(2,this._salleAffiche._taille.y-2));   
        this._ennemy[i] = orc;
    }
}

ModeleEcran.prototype.bougerEnnemy = function() {
    if (this._salleAffiche._nbMonstre != 0)
    {
        for (let i = 0; i < this._ennemy.length; i++)
        {
            let direction = this.cheminEnnemy(this._ennemy[i]);
            if (this.checkMur(this._ennemy[i]._pos.x + direction.x, this._ennemy[i]._pos.y + direction.y))
             {
                this._ennemy[i]._pos.x += direction.x; 
                this._ennemy[i]._pos.y += direction.y;
            }
        }
    } 
}

ModeleEcran.prototype.cheminEnnemy = function(ennemy)
{
    let direction = {
        x:0,
        y:0
    }
    //If next to Joueur
    if((this._playerPosition.x - ennemy._pos.x == 1 || this._playerPosition.x - ennemy._pos.x == -1)&&(this._playerPosition.y - ennemy._pos.y == 0))
    {
        direction.x =0;
        direction.y =0;
        ennemy._nextToPlayer = true;
    }
    else if((this._playerPosition.x - ennemy._pos.x == 0)&&(this._playerPosition.y - ennemy._pos.y == 1 || this._playerPosition.y - ennemy._pos.y == -1))
    {
        direction.x =0;
        direction.y =0;
        ennemy._nextToPlayer = true;
    }
    //Next to Joueur Diagonale Bas/Droite
    else if((this._playerPosition.x - ennemy._pos.x == 1)&&(this._playerPosition.y - ennemy._pos.y == 1)){
        if(generationNombre(0,1) == 1){
            direction.x = 1;
            direction.y = 0;
        }
        else{
            direction.x = 0;
            direction.y = 1;
        } 
        ennemy._nextToPlayer = false;
    }
    //Next to Joueur Diagonale Bas/Gauche
    else if((this._playerPosition.x - ennemy._pos.x == -1)&&(this._playerPosition.y - ennemy._pos.y == 1)){
        if(generationNombre(0,1) == 1){
            direction.x = -1;
            direction.y =0;
        }
        else{
            direction.x = 0;
            direction.y = 1;
        } 
        ennemy._nextToPlayer = false;
    }
    //Next to Joueur Diagonale Haut/Droite
    else if((this._playerPosition.x - ennemy._pos.x == 1)&&(this._playerPosition.y - ennemy._pos.y == -1)){
        if(generationNombre(0,1) == 1){
            direction.x = 1;
            direction.y = 0;
        }
        else {
            direction.x = 0;
            direction.y = -1;
        } 
        ennemy._nextToPlayer = false;
    }
    //Next to Joueur Diagonale Haut/Gauche
    else if((this._playerPosition.x - ennemy._pos.x == -1)&&(this._playerPosition.y - ennemy._pos.y == -1)){
        if(generationNombre(0,1) == 1){
            direction.x = -1;
            direction.y = 0;
        }
        else {
            direction.x = 0;
            direction.y = -1;
        } 
        ennemy._nextToPlayer = false;
    }
    else 
    {
        if (this._playerPosition.x - ennemy._pos.x > 0)
        {
            direction.x = 1;
        }
        if (this._playerPosition.x - ennemy._pos.x < 0)
        {
            direction.x = -1;
        }
        if (this._playerPosition.y - ennemy._pos.y > 0)
        {
            direction.y = 1;
        }
        if (this._playerPosition.y - ennemy._pos.y < 0)
        {
            direction.y = -1;
        }
        ennemy._nextToPlayer = false;
    }
    return direction;
}


ModeleEcran.prototype.checkMur = function(x,y)   //Et autres Orcs
{
    let possible = false;
    if(this._salleAffiche._matrice[x][y] == 1)
    {
        possible = true;
        this._ennemy.forEach(e => {
            if(e._pos.x == x && e._pos.y == y)
            {
                possible = false;
            }
        });
    }
    return possible;
}

ModeleEcran.prototype.attaqueEnnemy = function()
{
    this._ennemy.forEach(e => {
        if(e._nextToPlayer)
        {
            this._personnage._PV -= e._ATK
        }
    });
}


var generationNombre = function(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

class Entity{
    //PV : Points de Vie, ATK : Points d'attack
    constructor(PV,ATK,X,Y)
    {
        this._PV = PV;
        this._ATK = ATK;
        this._pos = {
            x : X,
            y : Y
        }
    }
}

class Orc extends Entity{
    constructor(X,Y)
    {
        super(10,1,X,Y);
        this._nextToPlayer = false;
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