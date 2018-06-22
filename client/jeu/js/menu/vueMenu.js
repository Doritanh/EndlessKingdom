import {Vue} from '../vue.js';

export class VueMenu extends Vue {
    constructor(modele) {
        super(modele);
        this._element = document.querySelector("#menu");
    }

    rafraichir() {
        this.listeDonjons();
        this.listePersonnage();
    }
}

VueMenu.prototype.listePersonnage = function() {
    let champPersonnage = document.querySelector("#selectionPerso span");
    let leftArrow = document.querySelector('#btnLeft');
    let rightArrow = docuement.querySelector('#btnRight');
    if (typeof this._modele !== undefined) {
        champPersonnage.textContent = this._modele._personnages[this._modele._actuelPersonnage]._nom;
    }
    leftArrow.addEventListener('click', function() {
        
    });
    rightArrow.addEventListener('click', function() {

    });

}

VueMenu.prototype.listeDonjons = function() {
    const choixDonjon = document.querySelector('#choixDonjon');
    const listeDonjons = document.querySelector("#choixDonjon table");

    while(listeDonjons.firstChild) {
        listeDonjons.removeChild(listeDonjons.firstChild);
    }
    if (document.querySelector('#creerDonjonButton')) {
        choixDonjon.removeChild(document.querySelector('#creerDonjonButton'));
    }

    if (this._modele._donjons.length > 0) {
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

        for(let i = 0; i<this._modele._donjons.length; i++) {
            let donjon = this._modele._donjons[i];
    
            let trDonjon = document.createElement("tr");
        
            let tdNom = document.createElement('td');
            let nomDonjon = document.createTextNode(donjon._nom);
            tdNom.appendChild(nomDonjon);
            trDonjon.appendChild(tdNom);
        
            let tdNiveau = document.createElement('td');
            let niveauDonjon = document.createTextNode(donjon._niveau);
            tdNiveau.appendChild(niveauDonjon);
            trDonjon.appendChild(tdNiveau);
        
            let tdMode = document.createElement('td');
            let mode = "";
            if (donjon._mode === 0) {
                mode = "Découverte";
            } else {
                mode = "Exploration";
            }
            let modeDonjon = document.createTextNode(mode);
            let btnMode = document.createElement('button');
            btnMode.addEventListener('click', function(e) {
                this._modele.lancerDonjon(donjon._niveau, 0);
            }.bind(this), false);
            btnMode.appendChild(modeDonjon);
            tdMode.appendChild(btnMode);
            trDonjon.appendChild(tdMode);
        
            listeDonjons.appendChild(trDonjon);
        }
    } else {
        let creerButton = document.createElement('button');
        creerButton.id = 'creerDonjonButton';
        let boutonNode = document.createTextNode('Création du premier donjon');
        creerButton.appendChild(boutonNode);
        choixDonjon.appendChild(creerButton);
        creerButton.addEventListener('click', e => {
            this._modele.creerDonjon();
        }, false);
    }
}