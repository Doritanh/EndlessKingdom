const Jeu = require('./jeu/jeu');
const identification = require('./identification/identification');
const requetes = require('./data/requetes');

class Utilisateur {
    constructor(socket, sessions) {
        this._socket = socket;
        this._sessions = sessions;
        this._sessionID = 0;
        this._pseudo = null;
        this._jeu = new Jeu();
    }

    setSessionID(id) {
        this._sessionID = id;
        this._jeu.setPseudo(this._sessions.get(this._sessionID));
        this._pseudo = this._sessions.get(this._sessionID);
        this.sendStatus();
    }
}

module.exports = Utilisateur;

Utilisateur.prototype.connexion = async function(pseudo, mdp) {
    let number = 0;
    try {
        number = await identification.connexion(pseudo, mdp);
    } catch (error) {
        console.log(error);
    }
    if (number === 1) this._sessionID = this._sessions.ajouter(pseudo);
    this._socket.send('connexion', {'number' : number, 'sessionID' : this._sessionID});
}

Utilisateur.prototype.inscription = async function(pseudo, mail, mdp, mdpConfirm) {
    let number = 0;
    try {
        number = await identification.inscription(pseudo, mail, mdp, mdpConfirm);
    } catch(error) {
        console.log(error);
    }
    this._socket.send('inscription', {'number': number});
}

Utilisateur.prototype.sendStatus = async function() {
    const id = await requetes.getIDFromPseudo(this._pseudo);
    const data = await requetes.getDataFromID(id);
    const STATUS_CODE = {
        ERROR : 'ERROR',
        NO_PERSONNAGE : 'NO_PERSONNAGE',
        MENU : 'MENU',
        DONJON : 'DONJON'
    }
    let status = STATUS_CODE.MENU;

    if (!data) {
        status = STATUS_CODE.ERROR;
    } else if (data.personnages.length === 0) {
        status = STATUS_CODE.NO_PERSONNAGE;
    } else if (typeof data.donjons.actuel !== 'undefined') {
        if (data.donjons.actuel !== 'none') {
            status = STATUS_CODE.DONJON;
        }
    }

    let contenu = [];
    if (status === STATUS_CODE.MENU) {
        contenu = {'personnages' : data.personnages, 'donjons' : data.donjons};
    }
    this._socket.send('status', {'status' : status, 'contenu' : contenu});
}

Utilisateur.prototype.creationPersonnage = async function(nom, difficulte) {
    let data = await requetes.getDataFromID(await requetes.getIDFromPseudo(this._pseudo));
    if (data.personnages.length === 0) {
        requetes.ajouterPersonnage(id, nom, difficulte);
    }
    this.sendStatus();
}