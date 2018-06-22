const Jeu = require('./jeu/jeu');
const Donjon = require('./jeu/donjon');
const Personnage = require('./jeu/personnage');
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

Utilisateur.prototype.getData = async function() {
    const data = await requetes.getDataFromID(await requetes.getIDFromPseudo(this._pseudo));
    if (!data) {
        this.sendStatus(STATUS_CODE.ERROR);
        return;
    }
    return data;
}

Utilisateur.prototype.connexion = async function(pseudo, mdp) {
    let number = 0;
    try {
        number = await identification.connexion(pseudo, mdp);
    } catch (error) {
        console.log("Erreur connexion : " + error);
    }
    if (number === 1) this._sessionID = this._sessions.ajouter(pseudo);
    this._socket.send('connexion', {'number' : number, 'sessionID' : this._sessionID});
}

Utilisateur.prototype.inscription = async function(pseudo, mail, mdp, mdpConfirm) {
    let number = 0;
    try {
        number = await identification.inscription(pseudo, mail, mdp, mdpConfirm);
    } catch(error) {
        console.log("Erreur inscription : " + error);
    }
    this._socket.send('inscription', {'number': number});
}

const STATUS_CODE = {
    ERROR : 'ERROR',
    NO_PERSONNAGE : 'NO_PERSONNAGE',
    MENU : 'MENU',
    DONJON : 'DONJON'
}
Utilisateur.prototype.sendStatus = async function(status = STATUS_CODE.MENU) {
    const data = await this.getData();

    if (typeof STATUS_CODE[status] === 'undefined') {
        status = STATUS_CODE.ERROR;
    }

    if (data.personnages.length === 0) {
        status = STATUS_CODE.NO_PERSONNAGE;
    } else if (typeof data.actuelDonjon !== 'undefined') {
        if (data.actuelDonjon !== 'none') {
            status = STATUS_CODE.DONJON;
        }
    }

    let contenu = [];
    if (status === STATUS_CODE.MENU) {
        contenu = {'personnages' : data.personnages, 'donjons' : data.donjons, 'actuelPersonnage' : data.actuelPersonnage};
    } else if (status === STATUS_CODE.DONJON) {
        contenu = {'donjon' : data.donjons[data.actuelDonjon], 'personnage' : data.personnages[data.actuelPersonnage]};
    }
    this._socket.send('status', {'status' : status, 'contenu' : contenu});
}

Utilisateur.prototype.creationPersonnage = async function(nom, difficulte, classe) {
    const data = await this.getData();
    let personnage = new Personnage(nom, difficulte, classe);
    await requetes.ajouterPersonnage(data._id, personnage);
    await requetes.setPersonnageActuel(data._id, data.personnages.length);
    this.sendStatus();
}

Utilisateur.prototype.lancerCreationPersonnage = function() {
    this.sendStatus(STATUS_CODE.NO_PERSONNAGE);
}

Utilisateur.prototype.setPersonnage = async function(selected) {
    /*const data = await this.getData();
    if (selected >= 0 && selected < data.personnages.length) {
        await requetes.setPersonnageActuel(data._id, selected);
        this.sendStatus();
    }*/
}

Utilisateur.prototype.creationDonjon = async function() {
    const data = await this.getData();
    let niveau = data.donjons.length;
    let donjon = new Donjon(niveau, 10, 10);
    await requetes.ajouterDonjon(data._id, donjon);
    this.sendStatus();
}

Utilisateur.prototype.lancerDonjon = async function(niveau, personnage) {
    const data = await this.getData();
    if (data.donjons.length <= niveau) {
        this.sendStatus(STATUS_CODE.ERROR);
        return;
    }
    await requetes.setDonjonActuel(data._id, niveau);
    this.sendStatus();
}