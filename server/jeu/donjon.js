module.exports = {
    generer : function(maxSalles) {
        return nouveauDonjon(maxSalles);
    }
}

var generationNombre = function(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

var nouveauDonjon = function(maxSalles) {
    let tailleX = 10;
    let tailleY = 10;

    let salles = [];
    let tabGenerated= [];
    let tabPossible = [];
    for (let i =0; i<tailleX; i++) {
        tabGenerated[i] = [];
        tabPossible[i] = [];
    }

    let compteur = 0;
    let newSalle;

    let spawnX = generationNombre(0,tailleX-1);
    let spawnY = generationNombre(0, tailleY-1);

    for(let i=0; i<tailleX;i++) {
        for (let j=0; j<tailleY;j++) {
            tabGenerated[i][j] = false;
        }
    }
    
    tabGenerated[spawnX][spawnY] = true;
	salles[0] = new Salle(spawnX, spawnY);

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
            // tjs dans la fonction
        }
        /*for(let i =0; i<tailleX;i++) {
            let ligne = "";
            for (let j=0; j<tailleY;j++) {
                if(tabPossible[i][j] == true) {
                    ligne += "1";
                }
                else {
                    ligne += "0";
                }
            }
            console.log(ligne)
        }*/

        //Compte le nombre de possibilite
        for(let i =0; i<tailleX;i++){
            for (let j=0; j<tailleY;j++) {
                if(tabPossible[i][j] == true) {
                    compteur ++;
                }
            }
        }
        
        
        //console.log(compteur);
        
        //Generation d'un nombre pour la nouvelle salle
        newSalle = generationNombre(1,compteur);
        
        //console.log(newSalle);
        
        compteur =0;
        for(let i =0; i<tailleX;i++) {
            for (let j=0; j<tailleY;j++) {
                if(tabPossible[i][j] == true) {
                    compteur ++;
                    if(compteur == newSalle) {
                        salles[salles.length]= new Salle(i,j);
                        tabGenerated[i][j]= true;
                        break;
                    }	
                }
            }
        }
        compteur =0;
    }
    return salles;
}

class Salle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return x;
    }

    getY() {
        return y;
    }
}