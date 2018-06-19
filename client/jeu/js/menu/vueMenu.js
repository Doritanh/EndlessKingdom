import {Vue} from '../vue.js';

export class VueMenu extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#menu");
        this.listerDonjons();
        this.listerPersonnages();
    }

    rafrachir() {
        this.listerDonjons();
        this.listerPersonnages();
    }
}

VueMenu.prototype.listerPersonnages = function() {
    if (typeof this._modeles === undefined) {
        let champPersonnage = document.querySelector("#selectionPerso span");
        champPersonnage.textContent = this._modele._personnages[0].nom;
    }
}

VueMenu.prototype.listerDonjons = function() {
    const choixDonjon = document.querySelector('#choixDonjon');
    const listeDonjons = document.querySelector("#choixDonjon table");

    while(listeDonjons.firstChild) {
        listeDonjons.removeChild(div.listeDonjons);
    }

    if (this._modele._donjons.length !== 0) {
        let trDonjon = document.createElement("tr");

        let thNom = document.createElement('th');
        thNom.appendChild(document.createTextNode("Nom"));
        trDonjon.appendChild(thNom);

        let thNiveau = document.createElement('th');
        thNiveau.appendChild(document.createTextNode("Niveau"));
        trDonjon.appendChild(thNiveau);

        let thMode = document.createElement('th');
        thMode.appendChild(document.createTextNode("Mode"));
        trDonjon.appendChild(thMode);

        listeDonjons.appendChild(trDonjon);
    } else {
        let creerButton = document.createElement('button');
        let boutonNode = document.createTextNode('Création du premier donjon');
        creerButton.appendChild(boutonNode);
        choixDonjon.appendChild(creerButton);
        creerButton.addEventListener('click', e => {
            this._modele.creerDonjon();
        }, false);
    }

    for(let i = 0; i<this._modele._donjons; i++) {
        let trDonjon = document.createElement("tr");
    
        let tdNom = document.createElement('td');
        let nomDonjon = document.createTextNode(nom);
        tdNom.appendChild(nomDonjon);
        trDonjon.appendChild(tdNom);
    
        let tdNiveau = document.createElement('td');
        let niveauDonjon = document.createTextNode(niveau);
        tdNiveau.appendChild(niveauDonjon);
        trDonjon.appendChild(tdNiveau);
    
        let tdMode = document.createElement('td');
        let modeDonjon = document.createTextNode(mode);
        let btnMode = document.createElement('button');
        btnMode.appendChild(modeDonjon);
        tdMode.appendChild(btnMode);
        trDonjon.appendChild(tdMode);
    
        listeDonjons.appendChild(trDonjon);
    }
}