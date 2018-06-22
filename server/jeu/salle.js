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
    if (x === 0) {
        this._nbMonstre = 0;
    } else if(x < 6) {
        this._nbMonstre = 1;
    } else if (x < 11) {
        this._nbMonstre = 2;
    } else if (x < 16) {
        this._nbMonstre = 3;
    } else if (x < 20) {
        this._nbMonstre = 4;
    } else {
        this._nbMonstre = 5;
    }
}

let matrice = function(x, y, portes) {
    let matrice = [];
    for (let i = 0; i <= x; i++) {
        matrice[i] = [];
        for (let j = 0; j <= y; j++) {
            matrice[i][j] = 'SolPierre';
        }
    }
    // On active les bords
    for (let i = 0; i <= x; i++) {
        matrice[i][0] = 'MurGauche';
        matrice[i][y] = 'MurDroit';
    }
    for (let i = 0; i <= y; i++) {
        if (i != Math.floor(y/2)) {
            matrice[0][i] = 'MurHaut';
            matrice[x][i] = 'MurBas';
        }
    }
    if (portes.north) {
        matrice[Math.floor(x/2)][0] = 'SolPierre';
    }
    if (portes.south) {
        matrice[Math.floor(x/2)][y] = 'SolPierre';
    }
    if (portes.west) {
        matrice[0][Math.floor(y/2)] = 'SolPierre';
    }
    if (portes.east) {
        matrice[x][Math.floor(y/2)] = 'SolPierre';
    }
    return matrice;
}