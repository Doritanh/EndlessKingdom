const Salle = require('./salle');

class Donjon {
    constructor(niveau, maxTaille, maxSalles) {
        this._niveau = niveau;
        this._maxTaille = maxTaille;
        this._maxSalles = maxSalles;
        this._matrice = matrice(this._maxSalles, this._maxTaille);
        this._salles = salles(this._matrice);
        this._spawn = spawn(this._maxSalles, this._matrice);
        this._fin = fin(this._maxSalles, this._matrice, this._spawn);
        this._salles[this._fin.x][this._fin.y]._fin = true;
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
    let tabSalles = [];
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            tabSalles[i] = [];
            tabSalles[i][j] = matrice[i][j];
        }
    }
    let north = false;
    let south = false;
    let west = false;
    let east = false;
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (matrice[i][j] == 1) {
                if (j-1 > 0) {
                    if (matrice[i][j-1] == 1) {
                        west = true;
                    }
                }
                if (j+1 < matrice[i].length) {
                    if (matrice[i][j+1] == 1) {
                        east = true;
                    }
                }
                if (i-1 > 0) {
                    if (matrice[i-1][j] == 1) {
                        north = true;
                    } 
                }
                if (i+1 < matrice.length) {
                    if (matrice[i+1][j] == 1) {
                        south = true;
                    }
                }
                tabSalles[i][j] = new Salle(north, south, west, east);
                west = false;
                east = false;
                north = false;
                south = false;
            }
        }
    }
    return tabSalles;
}

let spawn = function(maxSalles, matrice) {
    let spawn = generationNombre(0, maxSalles-1);
    let compteur = 0;
    let x = 0, y = 0;
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (matrice[i][j] === 1) {
                if (compteur === spawn) {
                    x = i;
                    y = j;
                    break;
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
let fin = function(maxSalles, matrice, spawn) {
    let fin = generationNombre(1, maxSalles-1);
    let compteur = 0;
    let x = 0, y = 0;
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (i != spawn.x || j != spawn.y) {
                if (matrice[i][j] === 1) {
                    if (compteur === fin) {
                        x = i;
                        y = j;
                        break;
                    }
                    compteur++;
                }
            }
        }
    }
    return {
        'x' : x,
        'y' : y
    }
}