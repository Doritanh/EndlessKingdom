class Salle {
    constructor(north, south, west, east) {
        this._taille = {
            x : 20,
            y : 11
        };
        this._portes = {
            'north' : north,
            'south' : south,
            'west' : west,
            'east' : east
        };
        this._nbMonstre = nbMonstre(5);
        this._matrice = matrice(20, 11, this._portes);
    }
}

module.exports = Salle;

let nbMonstre = function(max) {
    //Pourcentage change nombre de monstre
    let x = Math.floor(Math.random()*(max * 4));
    let nbMonstre = 0;
    if (x === 0) {
        nbMonstre = 0;
    } else if(x < 6) {
        nbMonstre = 1;
    } else if (x < 11) {
        nbMonstre = 2;
    } else if (x < 16) {
        nbMonstre = 3;
    } else if (x < 20) {
        nbMonstre = 4;
    } else {
        nbMonstre = 5;
    }
    return nbMonstre;
}

/* Légende matrice de salle
 * 0 : vide
 * 1 : sol
 * 2 : mur 
 */

let matrice = function(x, y, portes) {
    let matrice = [];
    for (let i = 0; i <= x; i++) {
        matrice[i] = [];
        for (let j = 0; j <= y; j++) {
            matrice[i][j] = 1;
        }
    }
    // On active les bords
    for (let i = 0; i <= x; i++) {
        matrice[i][0] = 2;
        matrice[i][y] = 2;
    }
    for (let i = 0; i <= y; i++) {
        matrice[0][i] = 2;
        matrice[x][i] = 2;
    }
    if (portes.north) {
        matrice[Math.floor(x/2)][0] = 1;
    }
    if (portes.south) {
        matrice[Math.floor(x/2)][y] = 1;
    }
    if (portes.west) {
        matrice[0][Math.floor(y/2)] = 1;
    }
    if (portes.east) {
        matrice[x][Math.floor(y/2)] = 1;
    }
    return matrice;
}