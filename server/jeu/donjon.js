class Donjon {
    constructor(niveau, taille, salles) {
        this._niveau = niveau;
        this._taille = taille;
        this._salles = salles;
        this._spawn = {
            x : generationNombre(0,this._taille-1),
            y : generationNombre(0,this._taille-1)
        };
        this._matrice = matrice(this._salles, this._taille, this._spawn.x, this._spawn.y);
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
let matrice = function(maxSalles, taille, spawnX, spawnY) {
    let tailleX = taille;
    let tailleY = taille;

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

    tabGenerated[spawnX][spawnY] = true;
    salles[spawnX][spawnY] = 1;
	//salles[0] = new Salle(spawnX, spawnY);

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