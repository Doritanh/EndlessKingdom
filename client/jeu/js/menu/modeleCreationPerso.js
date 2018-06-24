import {Modele} from '../modele.js';

export class ModeleCreationPerso extends Modele {
    constructor(socket) {
        super(socket);
    }

    nouveauPersonnage(nom, difficulte, classe) {
        this._socket.send(JSON.stringify({
            'id' : 'creationPerso',
            'values' : {
                'nom' : nom,
                'difficulte' : difficulte,
                'classe' : classe
            }
        }));
    }
}