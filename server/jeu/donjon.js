class Donjon {
    constructor(niveau, maxTaille, maxSalles) {
        this._niveau = niveau;
        this._maxTaille = maxTaille;
        this._maxSalles = maxSalles;
        this._salles = salles(matrice(this._maxSalles, this._maxTaille));
        this._spawn = spawn(this._maxSalles, this._salles);
        this._mode = 0;
        this._nom = nom();
    }
}

module.exports = Donjon;

var generationNombre = function(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

/**
 * Genere une matrice representant un donjon
 * @param {*} maxSalles 
 * @param {*} spawnX 
 * @param {*} spawnY 
 * @author Lucas Payet
 */
let matrice = function(maxSalles, maxTaille) {
    let tailleX = maxTaille;
    let tailleY = maxTaille;

    let salles = [];
    let tabGenerated= [];
    let tabPossible = [];
    for (let i =0; i<tailleX; i++) {
        salles[i] = [];
        tabGenerated[i] = [];
        tabPossible[i] = [];
    }

    for(let i=0; i<tailleX;i++) {
        for (let j=0; j<tailleY;j++) {
            salles[i][j] = 0;
            tabGenerated[i][j] = false;
        }
    }

    let spawnX = generationNombre(0,tailleX-1);
    let spawnY = generationNombre(0,tailleY-1);

    tabGenerated[spawnX][spawnY] = true;
    salles[spawnX][spawnY] = 1;

    for (let n=0; n < maxSalles-1; n++) {
        // Au debut tout est possible
        for(let i =0; i< tailleX; i++) {
            for (let j=0; j<tailleY; j++) {
                tabPossible[i][j] = true;
            }
        }
        // On enleve les salles deja generees
        for(let i =0; i<tailleX;i++) {
            for (let j=0; j<tailleY;j++) {
                if(tabGenerated[i][j] == true) {
                    tabPossible[i][j] = false;
                }
            }
        }

        //On enleve les endroits ou il n'y a pas de salles adjacentes
        for(let i =0; i<tailleX;i++) {
            for (let j=0; j<tailleY;j++) {
                if(tabPossible[i][j] == true) {
                    switch (i) {
                    //MIN I
                    case 0:
                        switch (j) {
                        //MIN J
                        case 0:
                            if(tabGenerated[i+1][j] == false && tabGenerated[i][j+1] == false){
                                tabPossible[i][j] = false;
                            }
                            break;
                        //MAX J	
                        case tailleY-1:
                            if(tabGenerated[i+1][j] == false && tabGenerated[i][j-1] == false){
                                    tabPossible[i][j] = false;
                            }
                            break;
                        //DEF J
                        default :
                            if(tabGenerated[i+1][j] == false && tabGenerated[i][j-1] == false 
                                && tabGenerated[i][j+1] == false) {
                                    tabPossible[i][j] = false;
                            }
                            break;
                        }
                        break;
                        
                    case tailleX-1:
                        switch (j){
                            //MIN J
                            case 0:
                                if(tabGenerated[i-1][j] == false && tabGenerated[i][j+1] == false) {
                                    tabPossible[i][j] = false;
                                }
                                break;
                            //MAX J	
                            case tailleY-1:
                                if(tabGenerated[i-1][j] == false && tabGenerated[i][j-1] == false){
                                        tabPossible[i][j] = false;
                                }
                                break;
                            //DEF J
                            default :
                                if(tabGenerated[i-1][j] == false && tabGenerated[i][j-1] == false 
                                    && tabGenerated[i][j+1] == false){
                                        tabPossible[i][j] = false;
                                }
                                break;
                        }
                        break;
                        
                    default:			
                        switch (j) {
                            //MIN J
                            case 0:
                                if(tabGenerated[i+1][j] == false && tabGenerated[i-1][j] == false 
                                    && tabGenerated[i][j+1] == false){
                                    tabPossible[i][j] = false;
                                }
                                break;
                            //MAX J	
                            case tailleY-1:
                                if(tabGenerated[i+1][j] == false && tabGenerated[i-1][j] == false 
                                    && tabGenerated[i][j-1] == false){
                                        tabPossible[i][j] = false;
                                }
                                break;
                            //DEF J
                            default :
                                if(tabGenerated[i+1][j] == false && tabGenerated[i-1][j] == false 
                                    && tabGenerated[i][j+1] == false && tabGenerated[i][j-1] == false){
                                    tabPossible[i][j] = false;
                                }
                                break;
                        }                   
                        break;
                    }
                    
                }
            }
        }

        let compteur = 0;

        //Compte le nombre de possibilite
        for(let i =0; i<tailleX;i++){
            for (let j=0; j<tailleY;j++) {
                if(tabPossible[i][j] == true) {
                    compteur ++;
                }
            }
        }
        
        //Generation d'un nombre pour la nouvelle salle
        let newSalle = generationNombre(1,compteur);
        
        compteur = 0;
        for(let i =0; i<tailleX;i++) {
            for (let j=0; j<tailleY;j++) {
                if(tabPossible[i][j] == true) {
                    compteur ++;
                    if(compteur == newSalle) {
                        //salles[salles.length]= new Salle(i,j);
                        salles[i][j] = 1;
                        tabGenerated[i][j]= true;
                        break;
                    }	
                }
            }
        }
        compteur = 0;
    }
    return salles;
}

let nom = function() {
    const emplacements = [
        'Crypte du',
        'Donjon du',
        'Chateau du',
        'Foret du'
    ];
    const bosses = [
        'nécromancien',
        'golem'
    ];
    const adjectifs = [
        'maudit',
        'sombre',
        'pas content'
    ];
    let mot1 = emplacements[generationNombre(0, emplacements.length-1)];
    let mot2 = bosses [generationNombre(0, bosses.length-1)];
    let mot3 = adjectifs[generationNombre(0, adjectifs.length-1)];
    return mot1 + " " + mot2 + " " + mot3;
}

let salles = function(matrice) {
    let tabSalles = matrice;
    let fin = false;
    let nb = Donjon._maxSalles -1;
    let north = false;
    let south = false;
    let west = false;
    let east = false;
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (matrice[i][j] == 1) {
                if (matrice[i-1][j] == 1){
                    west = true;
                } 
                if (matrice[i+1][j] == 1)
                {
                    east = true;
                }
                if (matrice[i][j-1])
                {
                    north = true;
                }
                if (matrice[i][j+1])
                {
                    south = true;
                }
                if (fin == false){
                    if (generationNombre(0,nb)==0)
                    {
                        fin = true;
                    }
                }
                tabSalles[i][j] = new Salle(north, south, west, east, fin);
            }
            nb-= 1;
            west = false;
            east = false;
            north = false;
            south = false;
        }
    }
    return tabSalles;
}

let spawn = function(maxSalles, tabSalles) {
    let spawn = generationNombre(0, maxSalles-1);
    let compteur = 0;
    let x = 0, y = 0;
    for (let i = 0; i < tabSalles.length; i++) {
        for (let j = 0; j < tabSalles[i].length; j++) {
            if (tabSalles[i][j] !== 0) {
                if (compteur == spawn) {
                    x = i;
                    y = j;
                }
                compteur++;
            }
        }
    }
    return {
        'x' : x,
        'y' : y
    }
}

class Salle {
    constructor(north, south, west, east, fin) {
        this._taille = {
            x : 21,
            y : 12
        };
        this._porteNorth = north;
        this._porteSouth = south;
        this._porteWest = west;
        this._porteEast = east;
        this._fin = fin;
        this._nbMonstre;

        console.log(this._porteEast, this._portWest, this._porteNorth, this._porteSouth, this._fin, this._nbMonstre);

        //Pourcentage change nombre de monstre
        let x = generationNombre(0,20);
        switch (x){
            case 0 :
                _nbMonstre = 0;
            break;
            case x<6 :
                _nbMonstre = 1;
            break;
            case x<11:
                _nbMonstre = 2;
            break;
            case x<16:
                _nbMonstre = 3;
            break;
            case x<20:
                _nbMonstre = 4;
            break;
            case 20:
                _nbMonstre =5;
            break;
        }

        console.log(this._porteEast, this._portWest, this._porteNorth, this._porteSouth, this._fin, this._nbMonstre);
    }

}