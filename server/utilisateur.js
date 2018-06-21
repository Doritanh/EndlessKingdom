const Jeu = require('./jeu/jeu');
const Donjon = require('./jeu/donjon');
const identification = require('./identification/identification');
const requetes = require('./data/requetes');

class Utilisateur {
    constructor(socket, sessions) {
        this._socket = socket;
        this._sessions = sessions;
        this._sessionID = 0;
        this._pseudo = null;
    }

    setSessionID(id) {
        this._sessionID = id;
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

Utilisateur.prototype.sendStatus = async function(erreur = false) {
    const id = await requetes.getIDFromPseudo(this._pseudo);
    const data = await requetes.getDataFromID(id);
    const STATUS_CODE = {
        ERROR : 'ERROR',
        NO_PERSONNAGE : 'NO_PERSONNAGE',
        MENU : 'MENU',
        DONJON : 'DONJON'
    }
    let status = STATUS_CODE.MENU;

    if (erreur || !data) {
        status = STATUS_CODE.ERROR;
    } else if (data.personnages.length === 0) {
        status = STATUS_CODE.NO_PERSONNAGE;
    } else if (typeof data.actuelDonjon !== 'undefined') {
        if (data.actuelDonjon !== 'none') {
            status = STATUS_CODE.DONJON;
        }
    }

    let contenu = [];
    if (status === STATUS_CODE.MENU) {
        contenu = {'personnages' : data.personnages, 'donjons' : data.donjons};
    } else if (status === STATUS_CODE.DONJON) {
        contenu = {'donjon' : data.donjons[data.actuelDonjon]};
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

Utilisateur.prototype.creationDonjon = async function() {
    let data = await requetes.getDataFromID(await requetes.getIDFromPseudo(this._pseudo));
    if (!data) this.sendStatus(true);
    let niveau = data.donjons.length;
    let donjon = new Donjon(niveau, 10, 10);
    requetes.ajouterDonjon(data._id, donjon);
    this.sendStatus();
}

Utilisateur.prototype.lancerDonjon = async function(niveau, personnage) {
    let id = await requetes.getIDFromPseudo(this._pseudo);
    let data = await requetes.getDataFromID(id);
    if (!data || data.donjons.length <= niveau) this.sendStatus(true);
    let r = await requetes.setDonjonActuel(id, niveau);
    this.sendStatus();
}